import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  title = 'Crystal Editor';
  editorForm = new FormGroup ({
    editorData: new FormControl()
  });
  onSubmit(){
    console.log(this.editorForm);
  }
}
