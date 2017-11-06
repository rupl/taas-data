var dropdowns = (function () {
  'use strict';

  var elements = {};

  function addBackDrop () {
    elements.backdrop = document.createElement('div');
    elements.backdrop.className = 'dropdown-backdrop';
    elements.backdrop.addEventListener('click', closeDropdown);
    document.body.appendChild(elements.backdrop);
  }

  function toggleDropdown (e) {
    var btn = e.target;
    var current = btn.getAttribute('aria-expanded') === 'true';
    elements.backdrop.setAttribute('data-active', !current);
    btn.setAttribute('aria-expanded', !current);
  }

  function closeDropdown () {
    var currentBtn = document.querySelector('[data-toggle][aria-expanded="true"]');
    currentBtn.setAttribute('aria-expanded', false);
    elements.backdrop.setAttribute('data-active', false);
  }

  function init () {
    var dropdownBtns = document.querySelectorAll('[data-toggle]');
    if (!dropdownBtns.length) {
      return;
    }

    for (var i = 0; i < dropdownBtns.length; i++) {
      dropdownBtns[i].addEventListener('click', toggleDropdown);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escapse' || e.code === 'Escapse' || e.keyCode === 27) {
        closeDropdown();
      }
    });

    addBackDrop();
  }

  return {
    init: init
  };
})();

dropdowns.init();
