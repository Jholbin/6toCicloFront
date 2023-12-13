import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { DataCatalogo } from 'src/app/models/dataCatalogo.model';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenService } from 'src/app/security/token.service';
import Swal from 'sweetalert2';
/* CORTEZ */
@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
/* CORTEZ */
export class AgregarLibroComponent implements OnInit {
  libroForm!: FormGroup;

  lstCategorias: DataCatalogo[] = [];
  lstTipos: DataCatalogo[] = [];
  maxYear: number = new Date().getFullYear();

  libro: Libro = {
    titulo: '',
    anio: 0,/* CORTEZ */
    serie: '',
    categoriaLibro: {
      idDataCatalogo: -1
    },
    tipoLibro: {
      idDataCatalogo: -1
    },
    usuarioRegistro: {/* CORTEZ */
      idUsuario: -1
    },
    usuarioActualiza: {/* CORTEZ */
      idUsuario: -1
    }
  };

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private utilService: UtilService,
    private tokenService: TokenService/* CORTEZ */
  ) {}

  objUsuario: Usuario = {};/* CORTEZ */

  objCategoria: DataCatalogo = {};
  objTipoLibro: DataCatalogo = {};/* CORTEZ */

  ngOnInit() {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      serie: ['', [Validators.required ]],/* CORTEZ */
      categoriaLibro: ['-1', [Validators.required, Validators.min(1)]],
      tipoLibro: ['-1', [Validators.required, Validators.min(1)]]
    });/* CORTEZ */

    this.libroForm.valueChanges.subscribe(formValue => {
      console.log('Formulario:', formValue);
    });/* CORTEZ */

    this.utilService.listaCategoriaDeLibro().subscribe(
      c => this.lstCategorias = c/* CORTEZ */
    );

    this.utilService.listaTipoLibroRevista().subscribe(
      t => this.lstTipos = t
    );

    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }
/* CORTEZ */
  registra() {
    this.libro.usuarioActualiza = this.objUsuario;
    this.libro.usuarioRegistro = this.objUsuario;

    this.libroService.registrar(this.libro).subscribe(
      (response) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: response.mensaje,
        });
/* CORTEZ */
        /*
        this.libroForm.reset({
          titulo: '',
          anio: '', 
          serie: '',
          categoriaLibro: '-1',
          tipoLibro: '-1'
        });
        */
       


      },
      (error) => {/* CORTEZ */
        console.error('Error en el servicio:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Ocurrió un error al intentar registrar el libro.',
        });
      }
    );
  }
/* CORTEZ */
  isFormValid(): boolean {
    return this.libroForm.valid;
  }

}
