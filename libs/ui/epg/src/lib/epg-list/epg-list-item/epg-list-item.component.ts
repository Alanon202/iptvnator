import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { EpgProgram } from '@iptvnator/shared/interfaces';
import { EpgItemDescriptionComponent } from '../epg-item-description/epg-item-description.component';

@Component({
    imports: [DatePipe, MatIcon, MatTooltip, TranslatePipe],
    selector: 'app-epg-list-item',
    templateUrl: './epg-list-item.component.html',
    styleUrls: ['./epg-list-item.component.scss'],
})
export class EpgListItemComponent {
    private dialog = inject(MatDialog);

    /** EPG Program to render */
    @Input() item!: EpgProgram;

    /** Whether the program is currently live */
    @Input() isLive = false;

    /** Whether the program is the active playback target */
    @Input() isActive = false;

    /** Whether archive playback is available for the program */
    @Input() showArchiveBadge = false;

    /** Emitted when the user clicks the archive replay badge */
    @Output() catchupRequested = new EventEmitter<EpgProgram>();

    /**
     * Opens the dialog with details about the selected program
     * @param program selected epg program
     */
    showDescription(program: EpgProgram): void {
        this.dialog.open(EpgItemDescriptionComponent, {
            width: '800px',
            data: program,
        });
    }

    onCatchupClick(event: Event): void {
        event.stopPropagation();
        this.catchupRequested.emit(this.item);
    }
}
