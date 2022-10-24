import { TritonClCoreModule } from ".yalc/@kognifai/triton-cl-angular";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PictureSelectorComponent } from "./picture-selector.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      TritonClCoreModule
    ],
    exports: [
      PictureSelectorComponent
    ],
    declarations: [PictureSelectorComponent]
  })
  export class PictureSelectorComponentModule {}