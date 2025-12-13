import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { RequestCallService } from '../services/request-call/request-call.service';


@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class RequestCallComponent {
  @Output() closed = new EventEmitter<void>();

  passengerList = [1,2,3,4,5,6,7,8,9,10,'10+'];

  constructor(private callService: RequestCallService) {}

  close() {
    this.closed.emit();
  }

  submitForm(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const data = {
      fullName: form.value.fname + " " + form.value.lname,
      email: form.value.email,
      phone: form.value.phone,
      passengers: form.value.passengers,
      travelDate: form.value.travelDate,
      destination: form.value.destination,
      message: form.value.message // <-- You will pass this dynamically later
    };

    this.callService.submitRequest(data).subscribe({
      next: (res) => {
        alert("Request submitted!");
        this.close();
      },
      error: (err) => {
        alert("Failed to submit");
        console.error(err);
      }
    });
  }
}
