import {
  Compiler, NgModule, Component, Input, ComponentRef,
  Directive, ModuleWithComponentFactories, OnChanges, ViewContainerRef, OnDestroy
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { TextHighlightingComponent } from '../../common/text-modificators/text-highlighting/text-highlighting.component';
import { ContentHideComponent } from '../../common/text-modificators/content-hide/content-hide.component';
import { AccordeonComponent } from '../../common/text-modificators/accordeon/accordeon.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TooltipComponent } from '../../common/text-modificators/tooltip/tooltip.component';
import { TextMapComponent } from '../../common/text-modificators/text-map/text-map.component';
import {AgmCoreModule} from '@agm/core';

@Directive({
  selector: '[appCompile]'
})
export class CompileDirective implements OnChanges, OnDestroy {

  @Input('appCompile') tpl: string;

  compRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnChanges() {

    this.vcRef.clear();
    this.compRef = null;
    const template = `${this.tpl}`;

    @Component({
      template
    })
    class DynamicComponent {
      constructor() {}
    }

    @NgModule({
      imports: [
        BrowserModule,
        MatExpansionModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAnVNHcjKDSp3iyXaOAse99A3KNUP6UsHU'
        }),
      ],
      declarations: [
        DynamicComponent,
        TextHighlightingComponent,
        ContentHideComponent,
        AccordeonComponent,
        TooltipComponent,
        TextMapComponent,
      ]
    })
    class DynamicComponentModule { }

    const component = DynamicComponent;
    const module = DynamicComponentModule;
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        const compFactory = moduleWithFactories.componentFactories.find(x => x.componentType === component);
        this.compRef = this.vcRef.createComponent(compFactory);
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.compRef.destroy();
  }

}

@NgModule({
  declarations: [CompileDirective],
  imports: [CommonModule],
  exports: [CompileDirective],
})
export class CompileDirectiveModule { }


