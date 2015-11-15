---
layout: post
title: 'Add "success" Flash Messages to Laravel 5.1'
date:   2015-11-14 10:00:00
categories: development
image: /assets/article_images/2015-11-15-laravel-authentication-success-flash-messages/title.jpg

---

Flash messages are session-based front-end notifications to inform users that an action was performed successfully or failed miserably. As senior [Drupal](http://www.drupal.org) developer, I've used them frequently for years. Now tapping into the world of the [Laravel 5.1](https://www.laravel.com) PHP framework, I was happy to see a [session mechanism](http://laravel.com/docs/5.1/session) capable of providing flash messages. A template snippet outputting these message could look like [this](https://github.com/Balauue/komilitona/blob/master/resources/views/snippets/error.blade.php). Unfortunately they are not constantly used in the skeleton app Laravel provides when starting a new project.

<!--more-->

Take user authentication as an example. Since version 5.0 Laravel ships with authentication scaffolds (see [this tutorial](https://scotch.io/tutorials/login-with-the-built-in-laravel-5-scaffolding) by Chris Sevilleja for more information).

On failed authentication, Laravel populates the ``$errors`` variable, so that the problem can be displayed as flash message to the user. However, successful login attempts are implicitly confirmed by not showing the error. The inbuild Laravel authentication lacks a proper success flash message mechanism.


## How to give success flash messages on user login

The functions relevant for authentication are part of the ``AuthenticatesUsers`` trait. Easy enough, we can overwrite the relevant functions in the ``AuthController``. See the listing below for a possible implementation. The `` Session::flash`` mechanism is used to inform on successful user registration, authentication and log out.

```php
/**
 * Create a new user instance after a valid registration.
 *
 * @param  array  $data
 * @return User
 */
protected function create(array $data)
{
    Session::flash('success', 'User successfully created.');
    return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'group' => $data['group'],
        'password' => bcrypt($data['password']),
    ]);
}

/**
 * Send the response after the user was authenticated.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  App\User  $user
 * @return \Illuminate\Http\Response
 */
protected function authenticated(Request $request, $user){
    $successmessage = 'Hej '.Auth::user()->name.', you have been successfully logged in!';
    $request->session()->flash('success', $successmessage);
    return redirect()->intended($this->redirectPath());
}

/**
 * Log the user out of the application.
 *
 * @return \Illuminate\Http\Response
 */
public function getLogout()
{
    Auth::logout();
    Session::flash('success', 'You have been successfully logged out!');
    return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/');
}
```

These flash messages can then be displayed in the template by this snippet:

```html
@if (session('success'))
	<div class="flash-message">
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
    </div>
@endif
```

As simple as this seems, the example makes clear how laravel although maturing quite well still needs some work to be consistent. 
