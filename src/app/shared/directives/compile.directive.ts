import {
  Compiler, NgModule, Component, Input, ComponentRef,
  Directive, ModuleWithComponentFactories, OnChanges, ViewContainerRef, Type
} from '@angular/core';
import { TextHighlightingComponent } from '../../common/text-modificators/text-highlighting/text-highlighting.component';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: '[appCompile]'
})
export class CompileDirective implements OnChanges {

  @Input('appCompile') tpl: string;
  @Input() appCompileContext: any = null;

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
        BrowserModule
      ],
      declarations: [DynamicComponent, TextHighlightingComponent]
    })
    class DynamicComponentModule { }

    const component = DynamicComponent;
    const module = DynamicComponentModule;
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        const compFactory = moduleWithFactories.componentFactories.find(x => x.componentType === component);

        this.compRef = this.vcRef.createComponent(compFactory);
        this.updateProperties();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateProperties() {
    if (!this.appCompileContext) {
      return;
    }
    Object.keys(this.appCompileContext).forEach((key: any) => {
      this.compRef.instance[key] = this.appCompileContext[key];
    });
  }

}


