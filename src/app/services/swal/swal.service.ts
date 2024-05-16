// src/app/swal.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  public confirmSave(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Save it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }

  public showAlertSuccess(message: string): Promise<SweetAlertResult> {
    return Swal.fire('Success', message, 'success');
  }

  public showAlertError(message: string): Promise<SweetAlertResult> {
    return Swal.fire('Error', message, 'error');
  }

  public confirmDelete(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }
}
