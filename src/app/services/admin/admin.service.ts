// src/app/services/admin/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingID: number;
  bookingDate: string;
  numberOfSeats: number;
  totalAmount: number;
}

export interface Destination {
  destinationID?: number;
  country: string;
  city: string;
  description: string;
}

export interface PackageAdmin {
  packageID: string;
  packageName: string;
  description: string;
  cost: number;

  // Backend returns Base64 for stored BLOB images
  imageDataBase64?: string;
  imageUrl?: string;

  destinationIds: number[];
  destinationNames?: string[];
}

export interface PackageDetailDto {
  packageId: string;
  tourTitle?: string;
  location?: string;
  durationLabel?: string;
  rating?: number;
  ratingCount?: number;
  pricePerPerson?: number;
  priceLabel?: string;
  mainImage?: string; // base64
  galleryImages?: string[]; // base64 list
  overviewText?: string;
  highlights?: string[];
  includes?: string[];
  notIncludes?: string[];
  itinerary?: { day?: string; title?: string; description?: string }[];
  faqs?: { question?: string; answer?: string }[];
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /* ------- BOOKINGS ------- */
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/api/admin/bookings`);
  }

  /* ------- DESTINATIONS (ADMIN CRUD) ------- */
  getDestinationsAdmin(): Observable<Destination[]> {
    return this.http.get<Destination[]>(
      `${this.base}/api/admin/destinations/all`
    );
  }

  createDestination(dest: Destination): Observable<Destination> {
    return this.http.post<Destination>(
      `${this.base}/api/admin/destinations/create`,
      dest
    );
  }

  updateDestination(id: number, dest: Destination): Observable<Destination> {
    return this.http.put<Destination>(
      `${this.base}/api/admin/destinations/update/${id}`,
      dest
    );
  }

  deleteDestination(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/api/admin/destinations/delete/${id}`
    );
  }

  /* ------- PACKAGES (with image + detail) ------- */
  getPackages(): Observable<PackageAdmin[]> {
    return this.http.get<PackageAdmin[]>(`${this.base}/api/admin/packages/all`);
  }

  createPackage(pkg: PackageAdmin, imageFile?: File): Observable<PackageAdmin> {
    const formData = this.buildPackageFormData(pkg, imageFile);
    return this.http.post<PackageAdmin>(
      `${this.base}/api/admin/packages/create`,
      formData
    );
  }

  updatePackage(
    id: string,
    pkg: PackageAdmin,
    imageFile?: File | null
  ): Observable<PackageAdmin> {
    const formData = this.buildPackageFormData(pkg, imageFile || undefined);
    return this.http.put<PackageAdmin>(
      `${this.base}/api/admin/packages/update/${id}`,
      formData
    );
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/api/admin/packages/delete/${id}`
    );
  }

  // Helper for package FormData
  private buildPackageFormData(pkg: PackageAdmin, imageFile?: File): FormData {
    const fd = new FormData();
    fd.append('packageID', pkg.packageID);
    fd.append('packageName', pkg.packageName);
    fd.append('description', pkg.description ?? '');
    fd.append('cost', String(pkg.cost ?? 0));

    (pkg.destinationIds ?? []).forEach((id) => {
      fd.append('destinationIds', id.toString());
    });

    if (imageFile) {
      fd.append('imageFile', imageFile); // backend expects 'imageFile'
    }

    return fd;
  }

  /* ------- PACKAGE DETAIL (ADMIN JSON endpoints) ------- */

  // GET detail for a package (admin)
  getPackageDetailAdmin(packageId: string): Observable<PackageDetailDto> {
    return this.http.get<PackageDetailDto>(
      `${this.base}/api/admin/package-details/${encodeURIComponent(packageId)}`
    );
  }

  // CREATE detail for a package (admin)
  createPackageDetailAdmin(
    packageId: string,
    dto: PackageDetailDto
  ): Observable<PackageDetailDto> {
    return this.http.post<PackageDetailDto>(
      `${this.base}/api/admin/package-details/create/${encodeURIComponent(
        packageId
      )}`,
      dto
    );
  }

  // UPDATE detail for a package (admin)
  updatePackageDetailAdmin(
    packageId: string,
    dto: PackageDetailDto
  ): Observable<PackageDetailDto> {
    return this.http.put<PackageDetailDto>(
      `${this.base}/api/admin/package-details/update/${encodeURIComponent(
        packageId
      )}`,
      dto
    );
  }

  // DELETE detail for a package (admin)
  deletePackageDetailAdmin(packageId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/api/admin/package-details/delete/${encodeURIComponent(
        packageId
      )}`
    );
  }
}
