# IT2810 - Project 2 - Group 48

## Install and Setup

Run these commands to download dependencies and run the project.

```bash
$ npm install
$ npm start
```

## React

This project is a web based exhibition of images, sound and poems. You are able to choose between 3 different categories (Animals, City and Nature) for each media type and view 4 different elements of that category. You can even mix and match categories. We followed the example layout and used css grid to realize it. This meant it would be easy to manipulate for responsive design later.

### Use of components

We divided the page into several components:

- AJAXComponent
  - SVGComponent 
  - PoemComponent
- AudioComponent
- ChecboxSelectorComponent
  - CheckboxComponent
- TabsComponent
  - TabComponent

We felt this was a natural composition as these are the distinctly different entities of the page. All AJAX components work relatively straight forward where they simply take in some data and display it according to what data they are expected to be given. The tab and Checkbox components simply update state variables.

## AJAX

Our use case for AJAX was rather simple, just download some files that are going to be displayed. This meant that we did not really have many restrictions as to what libraries we could choose from. Originally we looked at jQuery's AJAX features but when researching it we found that jQuery does not always play nice with react in respect to modifying the DOM and was therefore not recommended. Our second option was a library called Axios, that is know to work well with react. When looking into how to deal with caching of files using Axios we discovered Cachios, a small extension to Axios that does the exact caching we needed for our project. This made it trivial to make sure files where only loaded once. If you want to know how Cachios works they have a simple example on their [npm page](https://www.npmjs.com/package/cachios)

## Responsive Design

As stated above we used css-grid since it makes it easy to rearrange elements on the page. We used this in combination with media-queries to support multiple device sizes (phone, tablet and computer). We have not done anything special for landscape since we found that it functioned well with the media-queries we already had in place.

## Resources and licence

Audio is from [soundbible.com](https://soundbible.com) under CC licence.

Images made internally in the group (I'm sorry).

Poems gotten from [poets.org](https://www.poets.org/poetsorg/poems?field_poem_themes_tid=1456&field_occasion_tid=All&field_form_tid=All&title=city&field_first_name_value=city&field_last_name_value=city&body_value=city&page=1) under public domain.

Background image is from [toptal.com](https://www.toptal.com/designers/subtlepatterns/swirl-2/) under CC licence.