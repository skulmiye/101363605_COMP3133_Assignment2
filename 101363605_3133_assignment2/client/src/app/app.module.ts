import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    EmployeeListComponent,
    ViewEmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8084/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
