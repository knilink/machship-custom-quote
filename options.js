function constructOptions() {
  var inputFormula = document.getElementById('input-formula');
  chrome.storage.sync.get(function (data) {
    inputFormula.value = data.formula || '';
  });
  document.
    getElementById('btn-save').
    addEventListener(
      'click',
      function () {
        chrome.storage.sync.set({formula: inputFormula.value}, function() {
          alert('saved');
        });
      }
    );
}
constructOptions();
