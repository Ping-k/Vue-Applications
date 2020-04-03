<template>
  <div>
    <h3>单选按钮：Radio</h3>
    <div class="container-radio">
      <div class="radio">
        <input id="radio-1" name="radio" type="radio" checked>
        <label for="radio-1" class="radio-label">Checked</label>
      </div>

      <div class="radio">
        <input id="radio-2" name="radio" type="radio">
        <label for="radio-2" class="radio-label">Unchecked</label>
      </div>

      <div class="radio">
        <input id="radio-21" name="radio" type="radio">
        <label for="radio-21" class="radio-label"></label>
      </div>

      <div class="radio">
        <input id="radio-22" name="radio2" type="radio" disabled>
        <label for="radio-22" class="radio-label">未选中</label>
      </div>

      <div class="radio">
        <input id="radio-3" name="radio2" type="radio" checked disabled>
        <label for="radio-3" class="radio-label">选中</label>
      </div>
      <div class="radio">
        <input id="radio-31" name="radio2" type="radio" disabled>
        <label for="radio-31" class="radio-label"></label>
      </div>
    </div>

    <h3>复选框：Checkbox</h3>
    <div class="container-checkbox">
      <div class="checkbox">
        <input id="check-1" name="check-1" type="checkbox" checked>
        <label for="check-1" class="check-label"></label>Checked
      </div>

      <div class="checkbox">
        <input id="check-2" name="check-1" type="checkbox">
        <label for="check-2" class="check-label"></label>Unchecked
      </div>

      <div class="checkbox">
        <input id="check-21" name="check-1" type="checkbox">
        <label for="check-21" class="check-label"></label>
      </div>

      <div class="checkbox">
        <input id="check-22" name="check-2" type="checkbox" disabled>
        <label for="check-22" class="check-label"></label>未选中
      </div>

      <div class="checkbox">
        <input id="check-3" name="check-2" type="checkbox" checked disabled>
        <label for="check-3" class="check-label"></label>选中
      </div>
      <div class="checkbox">
        <input id="check-31" name="check-2" type="checkbox" disabled>
        <label for="check-31" class="check-label"></label>
      </div>
    </div>

    <!--CSS3写法-->
    <h3>CSS3变量式写法</h3>
    <div class="css3-radio-checkbox">
      <ul>
        <li>
          <input type="checkbox">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot;>">
        </li>
        <li>
          <input type="checkbox" checked="">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; checked>">
        </li>
        <li>
          <input type="radio" name="radio" value="1">
          <input type="text" readonly="" value="<input type=&quot;radio&quot;>">
        </li>
        <li>
          <input type="radio" name="radio" value="2" checked="">
          <input type="text" readonly="" value="<input type=&quot;radio&quot; checked>">
        </li>
        <li>
          <input type="checkbox" class="switch">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; class=&quot;switch&quot;>">
        </li>
        <li>
          <input type="checkbox" class="switch" checked="">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; class=&quot;switch&quot; checked>">
        </li>
      </ul>

      <ul>
        <li>
          <input type="checkbox" disabled="">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; disabled>">
        </li>
        <li>
          <input type="checkbox" checked="" disabled="">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; checked disabled>">
        </li>
        <li>
          <input type="radio" name="radio1" value="1" disabled="">
          <input type="text" readonly="" value="<input type=&quot;radio&quot; disabled>">
        </li>
        <li>
          <input type="radio" name="radio1" value="2" checked="" disabled="">
          <input type="text" readonly="" value="<input type=&quot;radio&quot; checked disabled>">
        </li>
        <li>
          <input type="checkbox" class="switch" disabled="">
          <input type="text" readonly="" value="<input type=&quot;checkbox&quot; class=&quot;switch&quot; disabled>">
        </li>
        <li>
          <input type="checkbox" class="switch" checked="" disabled="">
          <input type="text" readonly=""
                 value="<input type=&quot;checkbox&quot; class=&quot;switch&quot; checked disabled>">
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: "ControlsCSS"
  }
</script>

<style lang="scss" scoped>
  .container-radio {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    .radio {
      margin: 0.5rem;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
      }
      .radio-label {
        cursor: pointer;
      }
      input[type="radio"] + .radio-label:before {
        content: '';
        background: #f4f4f4;
        border-radius: 100%;
        border: 1px solid #b4b4b4;
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: -0.2em;
        margin-right: 0.5em;
        vertical-align: top;
        text-align: center;
        -webkit-transition: all 250ms ease;
        transition: all 250ms ease;
      }
      /*选中样式*/
      input[type="radio"]:checked + .radio-label:before {
        background-color: #409eff;
        box-shadow: inset 0 0 0 4px #f4f4f4;
      }
      /*光标移入样式*/
      input[type="radio"]:hover + .radio-label:before {
        outline: none;
        border-color: #409eff;
      }
      /*点击样式，获取光标状态*/
      input[type="radio"]:focus + .radio-label:before {
        outline: none;
        border-color: #409eff;
      }
      /*未设置label，缩小间距【:empty是指未包含任何子集元素】*/
      input[type="radio"] + .radio-label:empty:before {
        margin-right: 0;
      }
      /*按钮禁用*/
      input[type="radio"]:disabled + .radio-label:before {
        box-shadow: inset 0 0 0 4px #f4f4f4;
        border-color: #c0c4cc;
      }
      input[type="radio"][checked="checked"]:disabled + .radio-label:before {
        box-shadow: inset 0 0 0 4px #f4f4f4;
        border-color: #c0c4cc;
        background: #c0c4cc;
      }
      input[type="radio"]:disabled + .radio-label {
        color: #c0c4cc;
        cursor: not-allowed;
      }
      input[type="radio"]:disabled + .radio-label:before, input[type="radio"]:disabled + .radio-label {
        cursor: not-allowed;
      }
    }
  }

  .container-checkbox {
    .checkbox {
      display: inline-block;
      input[type='checkbox'] {
        position: absolute;
        opacity: 0;
      }
      /*默认*/
      .check-label {
        cursor: pointer;
        position: relative;
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        border-radius: 0.25em;
        border: 1px solid #b4b4b4;
        background: #f4f4f4;
        margin: 0 0.5em;

        -webkit-transition: opacity .5s ease;
        -moz-transition: opacity .5s ease;
        -o-transition: opacity .5s ease;
        -ms-transition: opacity .5s ease;
        transition: opacity .5s ease;
      }
      label::after {
        -webkit-transition: opacity .5s ease;
        -moz-transition: opacity .5s ease;
        -o-transition: opacity .5s ease;
        -ms-transition: opacity .5s ease;
        transition: opacity .5s ease;

        cursor: pointer;
        position: absolute;
        content: '';
        opacity: 0;
      }
      input[type='checkbox']:hover + label {
        border: 1px solid #07C160;
      }

      /*选中*/
      input[type='checkbox']:checked + label {
        background: #07C160;
        border: 1px solid #07C160;
      }
      input[type='checkbox']:checked + label::after {
        border: 2px solid #ffffff;
        border-top: none;
        border-right: none;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        width: 1em;
        height: 0.5em;
        top: 0.1em;
        left: 0.15em;
        opacity: 1.0;
      }
      /*禁用*/
      input[type='checkbox']:disabled + label {
        background: #f4f4f4;
        cursor: not-allowed;
        border: 1px solid #b4b4b4;
      }
      input[type='checkbox']:disabled + label::after {
        border: 2px solid #c0c4cc;
        border-top: none;
        border-right: none;
      }
    }
  }

  /*CSS3写法*/
  .css3-radio-checkbox {
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;

    input[type='checkbox'],
    input[type='radio'] {
      --active: #409eff;
      --active-inner: #fff;
      --input-border: #CDD9ED;
      --input-border-hover: #23C4F8;
      --background: #fff;
      --disabled: #F5F9FF;
      --disabled-inner: #E4ECFA;
      --shadow-inner: rgba(18, 22, 33, .1);
      height: 21px;
      outline: none;
      position: relative;
      -webkit-appearance: none;
      -moz-appearance: none;
      margin: 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
      height: 21px;
      border: 1px solid var(--input-border);
      background: var(--background);
      transition: background .3s ease, border-color .3s ease;
    }
    input[type='checkbox']:after,
    input[type='radio']:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: opacity .2s ease, -webkit-transform .3s ease, -webkit-filter .3s ease;
      transition: transform .3s ease, opacity .2s ease, filter .3s ease;
      transition: transform .3s ease, opacity .2s ease, filter .3s ease, -webkit-transform .3s ease, -webkit-filter .3s ease;
    }
    input[type='checkbox']:checked,
    input[type='radio']:checked {
      background: var(--active);
      border-color: var(--active);
    }
    input[type='checkbox']:checked:after,
    input[type='radio']:checked:after {
      -webkit-filter: drop-shadow(0 1px 2px var(--shadow-inner));
      filter: drop-shadow(0 1px 2px var(--shadow-inner));
      transition: opacity 0.3s ease, -webkit-filter 0.3s ease, -webkit-transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
      transition: opacity 0.3s ease, filter 0.3s ease, transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
      transition: opacity 0.3s ease, filter 0.3s ease, transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2), -webkit-filter 0.3s ease, -webkit-transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
    }
    input[type='checkbox']:disabled,
    input[type='radio']:disabled {
      cursor: not-allowed;
      opacity: .9;
      background: var(--disabled);
    }
    input[type='checkbox']:disabled:checked,
    input[type='radio']:disabled:checked {
      background: var(--disabled-inner);
      border-color: var(--input-border);
    }
    input[type='checkbox']:hover:not(:checked):not(:disabled),
    input[type='radio']:hover:not(:checked):not(:disabled) {
      border-color: var(--input-border-hover);
    }
    input[type='checkbox']:not(.switch),
    input[type='radio']:not(.switch) {
      width: 21px;
    }
    input[type='checkbox']:not(.switch):after,
    input[type='radio']:not(.switch):after {
      opacity: 0;
    }
    input[type='checkbox']:not(.switch):checked:after,
    input[type='radio']:not(.switch):checked:after {
      opacity: 1;
    }

    input[type='checkbox']:not(.switch) {
      border-radius: 6px;
    }
    input[type='checkbox']:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 7px;
      top: 3px;
      -webkit-transform: rotate(20deg);
      transform: rotate(20deg);
    }
    input[type='checkbox']:not(.switch):checked:after {
      -webkit-transform: rotate(43deg);
      transform: rotate(43deg);
    }
    input[type='checkbox'].switch {
      width: 38px;
      border-radius: 11px;
    }
    input[type='checkbox'].switch:after {
      left: 2px;
      top: 2px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background: var(--input-border);
    }
    input[type='checkbox'].switch:checked:after {
      background: var(--active-inner);
      -webkit-transform: translateX(17px);
      transform: translateX(17px);
    }
    input[type='checkbox'].switch:disabled:not(:checked):after {
      opacity: .6;
    }

    input[type='radio'] {
      border-radius: 50%;
    }
    input[type='radio']:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
    }
    input[type='radio']:checked:after {
      background: var(--active-inner);
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }

    ul {
      margin: 12px;
      padding: 0;
      list-style: none;
      width: 100%;
      max-width: 360px;
    }
    ul li {
      margin: 12px 0;
      padding-left: 48px;
      position: relative;
    }
    ul li input[type='checkbox'],
    ul li input[type='radio'] {
      position: absolute;
      left: 0;
      top: 0;
    }
    ul li input[type='text'] {
      line-height: 21px;
      border: 0;
      margin: 0;
      padding: 0;
      font-size: 12px;
      color: #6C7486;
      background: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      width: 100%;
      font-family: 'Source Sans Pro', Arial;
    }
  }
</style>
