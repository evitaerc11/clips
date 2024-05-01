import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  editForm = new FormGroup({
    clipId: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your clip is being updated.';
  alertColor = 'blue';
  @Output() update = new EventEmitter();

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) return;

    this.inSubmission = false;
    this.showAlert = false;

    this.editForm.controls.clipId.setValue(this.activeClip.docId as string);
    this.editForm.controls.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) return;

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being updated.';

    try {
      await this.clipService.updateClip(
        this.editForm.value.clipId as string,
        this.editForm.value.title as string
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later';
      return;
    }

    this.activeClip.title = this.editForm.value.title as string;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success! Your clip has been updated.';

    setTimeout(() => {
      this.modal.unregister('editClip');
    }, 1000);
  }
}
