import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  standalone: false,
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  displayedColumns = ['id', 'category', 'color', 'partNumber', 'actions'];

  constructor(
    private deviceService: DeviceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.findAll().subscribe(devices => {
      this.devices = devices;
    });
  }

  deleteDevice(id: number): void {
    this.deviceService.delete(id).subscribe(() => {
      this.devices = this.devices.filter(device => device.id !== id);
      this.snackBar.open('Dispositivo excluído com sucesso!', 'Fechar', {
        duration: 3000
      });
    });
  }
}
