angular.module('DrivenApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/booking.html',
    "<!-- apply angular app and controller to our body --><!-- <body ng-app=\"DrivenApp\" ng-controller=\"mainController\"> --> <div class=\"container\"> <div class=\"col-sm-8 col-sm-offset-2\"> <!-- PAGE HEADER --> <div class=\"page-header\"><h1>Form</h1></div> <!-- FORM --> <!-- pass in the variable if our form is valid or invalid --> <form name=\"userForm\" ng-submit=\"submitForm(userForm.$valid)\" novalidate> <!-- novalidate prevents HTML5 validation since we will be validating ourselves --> <!-- NAME --> <div class=\"form-group\"> <label>Name</label> <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"name\" required> </div> <!-- NUMBER --> <div class=\"form-group\"> <label>Number</label> <input type=\"number\" name=\"number\" class=\"form-control\" ng-model=\"user.number\" ng-minlength=\"10\" ng-maxlength=\"10\"> </div> <!-- EMAIL --> <div class=\"form-group\"> <label>Email</label> <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"email\"> </div> <!-- PICKUP LOCATION --> <div class=\"form-group\"> <label>Location</label> <input type=\"location\" name=\"location\" class=\"form-control\" ng-model=\"email\"> </div> <!-- PICKUP DATE/TIME --> <div class=\"form-group\"> <label>Date-time</label> <input type=\"date-time\" name=\"datetime\" class=\"form-control\" ng-model=\"email\"> </div> <!-- SUBMIT BUTTON --> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form> </div> </div> <!-- container -->"
  );


  $templateCache.put('views/faq.html',
    "<div> <h1>A couple of questions to better explain what we're all about:</h1> <h2>What does Driven do?</h2> <p>We solve a major problem for everyone with a car in urban India - driving. We provide verified, reliable and trained drivers at hourly rates.</p> <h2>Great, I see how that helps! So how do I book a driver?</h2> <p>Its easy! Head over to the Bookings page or download our app from the Play Store. Then sign up with your email and number, select your pick up location, date and time, and there you go! Easy as pie!</p> <h2>Hey you guys don't seem to be in my locality! How many places are you operational in?</h2> <p>Sorry if we aren't servicing your area yet. We promise to be there soon! As of yet we service the whole of Mumbai, up to cetain parts of Navi Mumbai and Thane. But we're expanding fast and before you know it we'll be at your doorstep too.</p> <h2>This seems fantastic! But how do you ensure your drivers are verified and trustworthy?</h2> <p>All our drivers undergo a rigorous 3 step verification process, including a police verification, a background check by a professional agency and our very own ultra strict personality tests. We have high standards for each round and only the best drivers are finally selected.</p> <h2>How do I pay the driver? Do you guys have any credit card/e-wallet facilities?</h2> <p>Right now you can pay the driver in cash, but we're in the process of integrating support for cards as well as mobile wallets!</p> <h2>What happens in case of any mishaps?</h2> <p>Answer here. </p> <h2>Do you guys have any other special offers?</h2> <p>We just launched a Pair Booking feature aimed at office commuters. With this, we provide a driver to pick you up in the morning to drop you till your office. In the evening, you get another driver to pick you from office and drop you back home. So sit back and travel in the comfort of your own car without having to worry about navigating rush hour traffic!</p> <h2>Wow that's fantastic! How much does it cost?</h2> <p>We are giving an introductory price of Rs. 400 only, for one Pair Booking (to and fro included). You can check our normal pricing structure in the fare chart <a href=\"#/fare\">here</a>.</p> <h2>Do you servcie special requests like daily/weekly bookings or outstation drivers?</h2> <p>Yes we do, but on a case-by-case basis. It depends on the availability of our drivers. Please get in touch with one of our executives by calling any of our numbers, listed <a href=\"#/contact\">here</a>.</p> </div>"
  );


  $templateCache.put('views/fare.html',
    "<div>Our fare chart:</div> <h1>Hourly bookings:</h1> <p>Base fare (up to 1 hour): Rs. 200/-</p> <p>Rate per hour (from 2nd hour onwards): Rs. 100/-</p> <h1>Pair Bookings:</h1> <p>Rs. 400/- flat fee for a morning ride and an evening ride.</p> <p>Each ride can be of a maximum of 2 hours, following which we will charge Rs. 50 per hour, per ride.</p> <p>Pair bookings can only be from point A to B and back to A (home to office and back to home) and cannot be used to take the driver to any other places. Extra charges will be applicable, as per our normal hourly rates, in any such scenario.</p>"
  );


  $templateCache.put('views/home.html',
    "<header> <div class=\"header-content\"> <div class=\"header-content-inner\"> <h1>Be Driven. Sit back and enjoy the ride.</h1> <hr> <p>Book a driver at the tap of a button and leave the rest to us. Be assured in the comfort of your own car!</p> <a href=\"#about\" class=\"btn btn-primary btn-xl page-scroll\">Find Out More</a> </div> </div> </header> <section class=\"bg-primary\" id=\"about\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-8 col-lg-offset-2 text-center\"> <h2 class=\"section-heading\">We've got what you need!</h2> <hr class=\"light\"> <p class=\"text-faded\">Driven takes care of all your driving hassles - without removing the most integral part of it: your personal car. Forget worrying about finding a driver or hailing a cab. The future is here.</p> <a href=\"#/login\" class=\"btn btn-default btn-xl\">Get Started!</a> </div> </div> </div> </section> <section id=\"services\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-12 text-center\"> <h2 class=\"section-heading\">At Your Service</h2> <hr class=\"primary\"> </div> </div> </div> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-diamond wow bounceIn text-primary\"></i> <h3>Trained Drivers</h3> <p class=\"text-muted\">Our drivers are highly experienced and well trained. </p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-paper-plane wow bounceIn text-primary\" data-wow-delay=\".1s\"></i> <h3>Total safety</h3> <p class=\"text-muted\">Our drivers have rigorous background checks done and are trained for all kinds of situations.</p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-newspaper-o wow bounceIn text-primary\" data-wow-delay=\".2s\"></i> <h3>Office trips made easy</h3> <p class=\"text-muted\">We solve your office travel hassles by providing a driver in the morning and again in the evening, to drive you to and fro work.</p> </div> </div> <div class=\"col-lg-3 col-md-6 text-center\"> <div class=\"service-box\"> <i class=\"fa fa-4x fa-heart wow bounceIn text-primary\" data-wow-delay=\".3s\"></i> <h3>Made with Love</h3> <p class=\"text-muted\">We don't fuck around.</p> </div> </div> </div> </div> </section> <section class=\"no-padding\" id=\"portfolio\"> <div class=\"container-fluid\"> <div class=\"row no-gutter\"> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/1.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/2.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/3.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/4.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/5.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> <div class=\"col-lg-4 col-sm-6\"> <a href=\"#\" class=\"portfolio-box\"> <img src=\"img/portfolio/6.jpg\" class=\"img-responsive\" alt=\"\"> <div class=\"portfolio-box-caption\"> <div class=\"portfolio-box-caption-content\"> <div class=\"project-category text-faded\"> Category </div> <div class=\"project-name\"> Project Name </div> </div> </div> </a> </div> </div> </div> </section> <aside class=\"bg-dark\"> <div class=\"container text-center\"> <div class=\"call-to-action\"> <h2>Free Download on the Google Play Store!</h2> <a href=\"https://play.google.com/store/apps/details?id=com.urbtranz.driven\" class=\"btn btn-default btn-xl wow tada\">Download Now!</a> </div> </div> </aside> <section id=\"contact\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-lg-8 col-lg-offset-2 text-center\"> <h2 class=\"section-heading\">Let's Get In Touch!</h2> <hr class=\"primary\"> <p>Want to talk to us? We'd love to hear back from you! Do check out the FAQs for some quick answers.</p> </div> <div class=\"col-lg-4 col-lg-offset-2 text-center\"> <i class=\"fa fa-phone fa-3x wow bounceIn\"></i> <p>123-456-6789</p> </div> <div class=\"col-lg-4 text-center\"> <i class=\"fa fa-envelope-o fa-3x wow bounceIn\" data-wow-delay=\".1s\"></i> <p><a href=\"mailto:support@getdriverr.com\">suport@getdriverr.com</a></p> </div> </div> </div> </section> <!-- \n" +
    "    <script src=\"//code.jquery.com/jquery-2.0.3.min.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.20/angular.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.20/angular-route.js\"></script>\n" +
    "    <script src=\"//code.angularjs.org/1.2.13/angular-cookies.js\"></script>\n" +
    "\n" +
    "    <script src=\"app.js\"></script>\n" +
    "    <script src=\"app-services/authentication.service.js\"></script>\n" +
    "    <script src=\"app-services/flash.service.js\"></script> --> <!-- Real user service that uses an api --> <!-- <script src=\"app-services/user.service.js\"></script> --> <!-- Fake user service for demo that uses local storage --> <!--<script src=\"app-services/user.service.local-storage.js\"></script>\n" +
    "\n" +
    "    <script src=\"home/home.controller.js\"></script>\n" +
    "    <script src=\"login/login.controller.js\"></script>\n" +
    "    <script src=\"register/register.controller.js\"></script>-->"
  );


  $templateCache.put('views/login.html',
    "<style>body    { padding-top:30px; }</style> <div class=\"col-md-6 col-md-offset-3\"> <h2>Login</h2> <!-- <div ng-show=\"vm.error\" class=\"alert alert-danger\"> {{vm.error}} </div> --> <!-- <form name=\"LoginForm\" ng-submit=\"vm.login()\" role=\"form\" ></form> --> <!-- apply angular app and controller to our body --> <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\"> <label for=\"username\">Username</label> <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"vm.username\" required> <span ng-show=\"LoginForm.username.$dirty && LoginForn.username.$error.required\" class=\"help-block\"> Username is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\"> <label for=\"password\">Password</label> <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"vm.password\" required> <span ng-show=\"LoginForm.password.$dirty && LoginForn.password.$error.required\" class=\"help-block\"> Password is required</span> </div> <div class=\"form-actions\"> <button type=\"submit\" ng-disabled=\"form.$invalid || vm.dataLoading\" class=\"btn btn-primary\">Login</button> <img ng-if=\"vm.dataLoading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"> <a href=\"#/register\" class=\"btn btn-link\"> Register</a> </div>  </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );


  $templateCache.put('views/register.html',
    "<style>body    { padding-top:30px; }</style> <div class=\"col-md-6 col-md-offset-3\"> <h2>Register</h2> <!--  <div ng-show=\"vm.error\" class=\"alert alert-danger\">{{vm.error}}</div> --> <form name=\"RegisterForm\" ng-submit=\"vm.register()\" role=\"form\"> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required }\"> <label for=\"firstname\">First Name</label> <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"vm.user.cust_name\" required> <span ng-show=\"RegisterForm.firstName.$dirty && RegisterForm.firstName.$error.required\" class=\"help-block\">First name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required }\"> <label for=\"lastname\">Last Name</label> <input type=\"text\" name=\"lastName\" id=\"lastName\" class=\"form-control\" ng-model=\"vm.user.lastName\" required> <span ng-show=\"RegisterForm.lastName.$dirty && RegisterForm.lastName.$error.required\" class=\"help-block\">First name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required }\"> <label for=\"emailid\">Email ID</label> <input type=\"text\" name=\"emailId\" id=\"Text1\" class=\"form-control\" ng-model=\"vm.user.cust_email\" required> <span ng-show=\"RegisterForm.emailId.$dirty && RegisterForm.emailId.$error.required\" class=\"help-block\">Last name is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.number.$dirty && RegisterForm.number.$error.required }\"> <label for=\"number\">Number</label> <input type=\"text\" name=\"number\" id=\"number\" class=\"form-control\" ng-model=\"vm.user.cust_number\" required> <span ng-show=\"RegisterForm.number.$dirty && RegisterForm.number.$error.required\" class=\"help-block\">Username is required</span> </div> <div class=\"form-group\" ng-class=\"{ 'has-error': RegisterForm.password.$dirty && RegisterForm.password.$error.required }\"> <label for=\"password\">Password</label> <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"vm.user.cust_pass\" required> <span ng-show=\"RegisterForm.password.$dirty && RegisterForm.password.$error.required\" class=\"help-block\">Password is required</span> </div> <div class=\"form-actions\"> <button type=\"submit\" ng-disabled=\"RegisterForm.$invalid || vm.dataLoading\" class=\"btn btn-primary\">Register</button> <img ng-if=\"vm.dataLoading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"> <a href=\"#/login\" class=\"btn btn-link\">Cancel</a> </div> </form> </div>"
  );

}]);
