<?php

class PositionField extends InputField {

  public $type = 'position';
  public $readonly = true;
  public $decoded = false;
  public $width = 425;
  public $height = 245;
  
  // assets
  static public $assets = array(
    'js' => array(
      'interact.min.js',
      'script.js'
    ),
    'css' => array(
      'style.css'
    ),
  );

  // load current file
  public function file() {
    if (!empty(panel()->route->arguments[1])) {
      $fileName = urldecode(panel()->route->arguments[1]);
      return $this->page()->file($fileName);
    }
    return NULL;
  }

  // decode stored value
  public function decoded() {
    $value = $this->value();
    if (!empty($value)) {
      return json_decode($value);
    }
    return FALSE;
  }

  // x coordinate in percentage
  public function left() {
    $decoded = $this->decoded();
    if (isset($decoded->left)) {
      return $decoded->left;
    }
    return 0;
  }

  // y coordinate in percentage
  public function top() {
    $decoded = $this->decoded();
    if (isset($decoded->top)) {
      return $decoded->top;
    }
    return 0;
  }

  // size in percentage
  public function size() {
    $decoded = $this->decoded();
    if (isset($decoded->size)) {
      return $decoded->size;
    }
    return 50;
  }

  // preview image
  public function preview() {
    $preview = new Brick('div');
    $preview->addClass('position-wrapper');

    $data = array(
      'field' => $this,
      'file'  => $this->file(),
      'left'  => $this->left(),
      'top'   => $this->top(),
      'size'  => $this->size(),
      'width' => $this->width,
      'height'=> $this->height
    );

    $preview->html(tpl::load(__DIR__ . DS . 'template.php', $data));
    
    return $preview;
  }

  // custom content brick to add unique id for js targeting
  public function content() {
    $content = new Brick('div');
    $content->addClass('field-content');
    $content->attr('id','js-field-position');
    $content->append($this->input());
    return $content;
  }

  // Template
  public function template() {

    // field is used for pages
    if (!$this->file()) {
      return FALSE;
    }

    // file can't have thumb
    if ($this->file() && !$this->file()->canHaveThumb()) {
      return FALSE;
    }

    return $this->element()
      ->append($this->label())
      ->append($this->preview())
      ->append($this->content())
      ->append($this->help());
  }

}