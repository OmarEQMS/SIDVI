import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/models';
import { SIDVIServices, Defaults } from 'src/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-editar-medicos',
    templateUrl: './editar-medicos.component.html',
    styleUrls: ['./editar-medicos.component.scss'],
})
export class EditarMedicosComponent implements OnInit {

    medicos: Medico[] = [new Medico()];
    elements: any = [];
    medicoModal: Medico;

    constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.listarMedicos();
    }

    private listarMedicos() {
        this.sidvi.medico.listarMedicos(undefined, undefined, undefined, undefined, undefined, 'estatus').subscribe(medicos => {
            this.medicos = medicos.resultados.map((item: any) => new Medico(item));
            for (const medico of this.medicos) {
                if (Defaults.allowBase64Types.includes(medico.mimetypeFoto)) {
                    medico.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(medico.archivoFoto as string);
                }
            }
        }, error => {
            console.error(error);
        });
    }

    detallesModal(idMedico) {
        console.log(idMedico);
    }
}
