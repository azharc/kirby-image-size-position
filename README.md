# kirby-image-size-position

A Kirby Panel field to size and position images. 

## Example

The field looks like this:

![gif](http://i.imgur.com/lhMF9FK.gif)

It automatically detects the aspect ratio of the image and allows you to resize and position it within a box. 

Which allows you to create image layouts that look like this:  

![gif](http://i.imgur.com/hS8uKKU.gif)

## Installation

Download and place in:  
 `site > fields > position`

Or clone using submodule:  
 `git submodule add https://github.com/azharc/kirby-image-size-position.git site/fields/position`
 
## Setup

In your blueprint file:
```
position:
  type: position
  label: Size & Position
  help: Unavailable on small screens.
``` 

The field automatically disables on smaller screens as it relies on keeping the box in which one sets the image size and position at a consistent size. 

## Usage

The field will add a field with JSON data to the txt file corresponding to your image:  
`Position: {"size":49,"left":36,"top":18}`

You can use this to absolutely position your images using an inline style tag: 
 
```
$position = json_decode($image->position());

style="width: {$position->size}%; top: {$position->top}%; left: {$position->left}%;"
```


