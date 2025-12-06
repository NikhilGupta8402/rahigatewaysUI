// src/app/services/package-detail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PackageDetailDto {
  packageId: string;
  tourTitle: string;
  location: string;
  durationLabel: string;
  rating: number;
  ratingCount: number;
  pricePerPerson: number;
  priceLabel: string;
  mainImage: string;
  galleryImages: string[];
  overviewText: string;
  highlights: string[];
  includes: string[];
  notIncludes: string[];
  itinerary: { day: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

@Injectable({ providedIn: 'root' })
export class PackageDetailService {
  private base = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getDetail(packageId: string): Observable<PackageDetailDto> {
    return this.http.get<PackageDetailDto>(
      `${this.base}/api/packages/${packageId}/detail`
    );
  }
}
