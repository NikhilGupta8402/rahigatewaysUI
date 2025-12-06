// src/app/admin/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import {
  AdminService,
  Destination,
  PackageAdmin,
  Booking,
  PackageDetailDto,
} from '../services/admin/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

type AdminTab = 'destinations' | 'packages' | 'bookings';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // -------- TABS ----------
  activeTab: AdminTab = 'destinations';

  // -------- MODAL STATES ----------
  showDestinationModal = false;
  showPackageModal = false;

  // -------- DESTINATIONS ----------
  destinations: Destination[] = [];
  loadingDestinations = false;
  editingDestinationId: number | null = null;

  destinationForm: Destination = {
    country: '',
    city: '',
    description: '',
  };

  // -------- PACKAGES ----------
  packages: PackageAdmin[] = [];
  loadingPackages = false;
  editingPackageId: string | null = null;

  packageForm: PackageAdmin = {
    packageID: '',
    packageName: '',
    description: '',
    cost: 0,
    destinationIds: [],
  };

  // local state for package image upload
  selectedPackageImageFile: File | null = null;

  // -------- PACKAGE DETAIL EDITOR ----------
  editingDetailVisible = false;
  packageDetailForm: PackageDetailDto = this.emptyDetail();
  detailExists = false;

  // text areas bridging arrays <-> textarea
  highlightsText = '';
  includesText = '';
  notIncludesText = '';
  itineraryText = ''; // each line: Day X | Title | Description (optional)
  faqsText = ''; // each line: Question|Answer

  // gallery base64 array
  // (we store base64 strings in packageDetailForm.galleryImages)
  // -------- BOOKINGS ----------
  bookings: Booking[] = [];
  loadingBookings = false;

  constructor(
    private adminService: AdminService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn() || !this.auth.isAdmin()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadDestinations();
    this.loadPackages();
    this.loadBookings();
  }

  setTab(tab: AdminTab) {
    this.activeTab = tab;
    if (tab !== 'packages') this.editingDetailVisible = false;
  }

  // ---------------- MODAL CONTROLS ----------------
  openDestinationModal() {
    this.resetDestinationForm();
    this.showDestinationModal = true;
  }

  closeDestinationModal(event?: Event) {
    if (event) event.preventDefault();
    this.showDestinationModal = false;
    this.resetDestinationForm();
  }

  openPackageModal() {
    this.resetPackageForm();
    this.showPackageModal = true;
  }

  closePackageModal(event?: Event) {
    if (event) event.preventDefault();
    this.showPackageModal = false;
  }

  closeDetailModal(event?: Event) {
    if (event) event.preventDefault();
    this.editingDetailVisible = false;
  }

  // ---------------- DESTINATIONS ----------------
  loadDestinations() {
    this.loadingDestinations = true;
    this.adminService.getDestinationsAdmin().subscribe({
      next: (data) => {
        this.destinations = data;
        this.loadingDestinations = false;
      },
      error: (err) => {
        console.error('Error loading destinations', err);
        this.loadingDestinations = false;
      },
    });
  }

  resetDestinationForm() {
    this.editingDestinationId = null;
    this.destinationForm = { country: '', city: '', description: '' };
  }

  onEditDestination(dest: Destination) {
    this.editingDestinationId = dest.destinationID ?? null;
    this.destinationForm = {
      destinationID: dest.destinationID,
      country: dest.country,
      city: dest.city,
      description: dest.description,
    };
    this.showDestinationModal = true;
  }

  onDeleteDestination(dest: Destination) {
    if (!dest.destinationID) return alert('Destination id is missing.');
    if (!confirm(`Delete destination "${dest.city}, ${dest.country}"?`)) return;
    this.adminService.deleteDestination(dest.destinationID).subscribe({
      next: () => this.loadDestinations(),
      error: (err) => console.error('Error deleting destination', err),
    });
  }

  onSubmitDestinationForm() {
    if (!this.destinationForm.country || !this.destinationForm.city) {
      alert('Country and City are required.');
      return;
    }
    const { destinationID, ...payload } = this.destinationForm;
    if (this.editingDestinationId) {
      this.adminService
        .updateDestination(this.editingDestinationId, payload)
        .subscribe({
          next: () => {
            this.loadDestinations();
            this.closeDestinationModal();
          },
          error: (err) => console.error('Error updating destination', err),
        });
    } else {
      this.adminService.createDestination(payload).subscribe({
        next: () => {
          this.loadDestinations();
          this.closeDestinationModal();
        },
        error: (err) => console.error('Error creating destination', err),
      });
    }
  }

  // ---------------- PACKAGES ----------------
  loadPackages() {
    this.loadingPackages = true;
    this.adminService.getPackages().subscribe({
      next: (data) => {
        this.packages = data;
        this.loadingPackages = false;
      },
      error: (err) => {
        console.error('Error loading packages', err);
        this.loadingPackages = false;
      },
    });
  }

  resetPackageForm() {
    this.editingPackageId = null;
    this.packageForm = {
      packageID: '',
      packageName: '',
      description: '',
      cost: 0,
      destinationIds: [],
    };
    this.selectedPackageImageFile = null;
    this.editingDetailVisible = false;
    this.packageDetailForm = this.emptyDetail();
    this.detailExists = false;
    this.clearDetailTextFields();
  }

  onEditPackage(pkg: PackageAdmin) {
    this.editingPackageId = pkg.packageID;
    this.packageForm = {
      packageID: pkg.packageID,
      packageName: pkg.packageName,
      description: pkg.description,
      cost: pkg.cost,
      destinationIds: pkg.destinationIds ? [...pkg.destinationIds] : [],
      imageDataBase64: pkg.imageDataBase64,
      imageUrl: pkg.imageUrl,
    };
    this.selectedPackageImageFile = null;
    this.showPackageModal = true;
    this.editingDetailVisible = false;
    this.packageDetailForm = this.emptyDetail();
    this.detailExists = false;
    this.clearDetailTextFields();
  }

  onDeletePackage(pkg: PackageAdmin) {
    if (!confirm(`Delete package "${pkg.packageName}"?`)) return;
    this.adminService.deletePackage(pkg.packageID).subscribe({
      next: () => this.loadPackages(),
      error: (err) => console.error('Error deleting package', err),
    });
  }

  onPackageImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectedPackageImageFile = file;
  }

  // This method creates or updates a package. After create it opens the detail editor.
  onSubmitPackageForm() {
    if (!this.packageForm.packageID || !this.packageForm.packageName) {
      alert('Package ID and Name are required.');
      return;
    }

    // CREATE new package
    if (!this.editingPackageId) {
      this.adminService
        .createPackage(
          this.packageForm,
          this.selectedPackageImageFile || undefined
        )
        .subscribe({
          next: (createdPkg) => {
            // refresh list
            this.loadPackages();

            // set editing state and update form with returned values
            this.editingPackageId = createdPkg.packageID;
            this.packageForm = {
              packageID: createdPkg.packageID,
              packageName: createdPkg.packageName,
              description: createdPkg.description,
              cost: createdPkg.cost,
              destinationIds: createdPkg.destinationIds ?? [],
              imageDataBase64: createdPkg.imageDataBase64,
              imageUrl: createdPkg.imageUrl,
            };
            this.selectedPackageImageFile = null;

            // Close package modal and open detail editor
            this.showPackageModal = false;
            this.editingDetailVisible = true;
            this.loadPackageDetail(this.editingPackageId);
          },
          error: (err) => {
            console.error('Error creating package', err);
            alert('Failed to create package. See console for details.');
          },
        });

      return;
    }

    // UPDATE existing package
    this.adminService
      .updatePackage(
        this.editingPackageId as string,
        this.packageForm,
        this.selectedPackageImageFile
      )
      .subscribe({
        next: (updated) => {
          this.loadPackages();
          this.packageForm = {
            packageID: updated.packageID,
            packageName: updated.packageName,
            description: updated.description,
            cost: updated.cost,
            destinationIds: updated.destinationIds ?? [],
            imageDataBase64: updated.imageDataBase64,
            imageUrl: updated.imageUrl,
          };
          this.selectedPackageImageFile = null;
          this.showPackageModal = false;
          alert('Package updated successfully!');
        },
        error: (err) => {
          console.error('Error updating package', err);
          alert('Failed to update package. See console for details.');
        },
      });
  }

  onDestinationSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selected: number[] = [];
    for (let i = 0; i < select.selectedOptions.length; i++) {
      const opt = select.selectedOptions[i];
      selected.push(Number(opt.value));
    }
    this.packageForm.destinationIds = selected;
  }

  // ---------------- PACKAGE DETAIL EDITOR ----------------
  emptyDetail(): PackageDetailDto {
    return {
      packageId: '',
      tourTitle: '',
      location: '',
      durationLabel: '',
      rating: undefined,
      ratingCount: undefined,
      pricePerPerson: undefined,
      priceLabel: '',
      mainImage: undefined,
      galleryImages: [],
      overviewText: '',
      highlights: [],
      includes: [],
      notIncludes: [],
      itinerary: [],
      faqs: [],
    };
  }

  clearDetailTextFields() {
    this.highlightsText = '';
    this.includesText = '';
    this.notIncludesText = '';
    this.itineraryText = '';
    this.faqsText = '';
  }

  openDetailEditor() {
    if (!this.editingPackageId) {
      alert('Open or create a package first to edit its details.');
      return;
    }
    this.showPackageModal = false;
    this.editingDetailVisible = true;
    this.loadPackageDetail(this.editingPackageId);
  }

  loadPackageDetail(packageId: string) {
    this.adminService.getPackageDetailAdmin(packageId).subscribe({
      next: (dto) => {
        this.packageDetailForm = { ...dto };
        this.detailExists = true;
        // fill textarea bridging fields
        this.highlightsText = (dto.highlights ?? []).join('\n');
        this.includesText = (dto.includes ?? []).join('\n');
        this.notIncludesText = (dto.notIncludes ?? []).join('\n');

        // itinerary -> join lines (Day|Title|Desc) if structured
        this.itineraryText = (dto.itinerary ?? [])
          .map(
            (d) => `${d.day ?? ''} | ${d.title ?? ''} | ${d.description ?? ''}`
          )
          .join('\n');

        // faqs -> join lines "Q|A"
        this.faqsText = (dto.faqs ?? [])
          .map((f) => `${f.question ?? ''}|${f.answer ?? ''}`)
          .join('\n');
      },
      error: (err) => {
        // start with blank
        console.warn('Package detail not found, creating blank form', err);
        this.packageDetailForm = this.emptyDetail();
        this.packageDetailForm.packageId = packageId;
        this.detailExists = false;
        this.clearDetailTextFields();
      },
    });
  }

  // Files -> Base64 helpers
  readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });
  }

  async onMainImageSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await this.readFileAsBase64(file);
      this.packageDetailForm.mainImage = dataUrl.split(',')[1] ?? dataUrl;
    } catch (e) {
      console.error('Failed to read main image', e);
    }
  }

  async onGallerySelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;
    const arr: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const dataUrl = await this.readFileAsBase64(files[i]);
        arr.push(dataUrl.split(',')[1] ?? dataUrl);
      } catch (e) {
        console.error('Failed to read gallery image', e);
      }
    }
    this.packageDetailForm.galleryImages = [
      ...(this.packageDetailForm.galleryImages ?? []),
      ...arr,
    ];
  }

  removeGalleryImage(idx: number) {
    if (!this.packageDetailForm.galleryImages) return;
    this.packageDetailForm.galleryImages.splice(idx, 1);
  }

  // parse helper for lines -> array
  parseLines(text?: string) {
    if (!text) return [];
    return text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  // Save (create or update) package detail
  savePackageDetail() {
    if (!this.editingPackageId) {
      alert('Open a package first.');
      return;
    }

    // sync textareas into arrays in dto
    const dto: PackageDetailDto = { ...this.packageDetailForm };
    dto.packageId = this.editingPackageId;
    dto.highlights = this.parseLines(this.highlightsText);
    dto.includes = this.parseLines(this.includesText);
    dto.notIncludes = this.parseLines(this.notIncludesText);

    // itinerary parsing: "Day | Title | Description"
    dto.itinerary = this.parseLines(this.itineraryText).map((line) => {
      const parts = line.split('|').map((p) => p.trim());
      return {
        day: parts[0] ?? '',
        title: parts[1] ?? '',
        description: parts[2] ?? '',
      };
    });

    // faqs parsing: "Question|Answer"
    dto.faqs = this.parseLines(this.faqsText).map((line) => {
      const [q, a] = line.split('|').map((p) => p.trim());
      return { question: q ?? '', answer: a ?? '' };
    });

    if (this.detailExists) {
      this.adminService
        .updatePackageDetailAdmin(this.editingPackageId, dto)
        .subscribe({
          next: (res) => {
            alert('Package detail updated.');
            this.editingDetailVisible = false;
          },
          error: (err) => {
            console.error('Error updating package detail', err);
            alert('Failed to update package detail. See console.');
          },
        });
    } else {
      this.adminService
        .createPackageDetailAdmin(this.editingPackageId, dto)
        .subscribe({
          next: (res) => {
            alert('Package detail created.');
            this.detailExists = true;
            this.editingDetailVisible = false;
          },
          error: (err) => {
            console.error('Error creating package detail', err);
            alert('Failed to create package detail. See console.');
          },
        });
    }
  }

  deletePackageDetail() {
    if (!this.editingPackageId) return;
    if (!confirm('Delete package detail for this package?')) return;
    this.adminService
      .deletePackageDetailAdmin(this.editingPackageId)
      .subscribe({
        next: () => {
          alert('Package detail deleted.');
          this.packageDetailForm = this.emptyDetail();
          this.detailExists = false;
          this.editingDetailVisible = false;
          this.clearDetailTextFields();
        },
        error: (err) => {
          console.error('Error deleting package detail', err);
          alert('Failed to delete package detail. See console.');
        },
      });
  }

  // ---------------- BOOKINGS ----------------
  loadBookings() {
    this.loadingBookings = true;
    this.adminService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loadingBookings = false;
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.loadingBookings = false;
      },
    });
  }

  logout() {
    this.auth.logout();
  }
}
