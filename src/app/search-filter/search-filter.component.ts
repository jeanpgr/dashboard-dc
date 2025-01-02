import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {

  departamentos: string[] = ['Auditoría Interna', 'Relaciones Industriales', 'Planificación', 'Financiero'];

  selectedDepartamento: string = '';
  cargosYNombres: { departamento: string, cargo: string, nombre: string }[] = [
    { departamento: 'Auditoría Interna', cargo: 'Auditor Jefe', nombre: 'Juan Pérez' },
    { departamento: 'Planificación', cargo: 'Director', nombre: 'María García' },
    { departamento: 'Relaciones Industriales', cargo: 'Secretaria', nombre: 'Carlos Rodríguez' },
    { departamento: 'Auditoría Interna', cargo: 'Auditor', nombre: 'Ana Martínez' },
    { departamento: 'Relaciones Industriales', cargo: 'Desarrollador Jefe', nombre: 'Pedro Sánchez' },
    { departamento: 'Planificación', cargo: 'Secretaria', nombre: 'Laura López' },
    { departamento: 'Financiero', cargo: 'Director', nombre: 'Sofía Ramírez' },
    { departamento: 'Financiero', cargo: 'Contador', nombre: 'Diego Torres' },
  ];

  filteredItems: { cargo: string, nombre: string }[] = [];
  searchControl = new FormControl({value:'', disabled: true});
  showDropdown = false;

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterItems(value);
    });
  }

  onDepartamentoChange() {
    if (this.selectedDepartamento) {
      this.searchControl.enable();
      this.searchControl.setValue('');
    } else {
      this.searchControl.disable();
      this.searchControl.setValue('');
    }
    this.filterItems(this.searchControl.value);
  }

  filterItems(value: string | null) {
    if (!this.selectedDepartamento) {
      this.filteredItems = [];
      return;
    }

    if (!value) {
      this.filteredItems = this.cargosYNombres
        .filter(item => item.departamento === this.selectedDepartamento)
        .map(({ cargo, nombre }) => ({ cargo, nombre }));
    } else {
      const filterValue = value.toLowerCase();
      this.filteredItems = this.cargosYNombres
        .filter(item => 
          item.departamento === this.selectedDepartamento &&
          (item.cargo.toLowerCase().includes(filterValue) || 
           item.nombre.toLowerCase().includes(filterValue))
        )
        .map(({ cargo, nombre }) => ({ cargo, nombre }));
    }
  }

  selectItem(item: { cargo: string, nombre: string }) {
    this.searchControl.setValue(`${item.cargo} - ${item.nombre}`);
    this.showDropdown = false;
  }

  onInputFocus() {
    if (this.selectedDepartamento) {
      this.showDropdown = true;
    }
  }

  onInputBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

}
