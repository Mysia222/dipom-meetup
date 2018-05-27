import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {ReactiveFormsModule} from "@angular/forms";
import { EditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [EditorComponent]
})
export class EditorModule { }
