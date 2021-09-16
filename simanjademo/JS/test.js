var server = "192.168.5.16:8080";

function tested() {
  var obj = [{
    SWITCHING: "Mitracomm"
  }, {
    SWITCHING: "DJI"
  }, {
    SWITCHING: "JPA"
  }];
  var myJSON = JSON.stringify(obj);
  var result = JSON.parse(myJSON);
  console.log(result);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].SWITCHING);
  }
}

function getSwitchingRekonOLD() {
  var tabed = document.getElementById('custom-tabs-one-tab');
  var divtable = document.getElementById('custom-tabs-one-tabContent');
  var obj = [{
    SWITCHING: "MITRACOMM"
  }, {
    SWITCHING: "DJI"
  }, {
    SWITCHING: "JPA"
  }];
  var myJSON = JSON.stringify(obj);
  var result = JSON.parse(myJSON);

  var obj2 = [{
    SWITCHING: "MITRACOMM",
    produk: "PDAM A",
    tanggal: "26/11/2020"
  }, {
    SWITCHING: "MITRACOMM",
    produk: "PDAM B",
    tanggal: "26/11/2020"
  }, {
    SWITCHING: "MITRACOMM",
    produk: "PDAM C",
    tanggal: "26/11/2020"
  }];
  var myJSON2 = JSON.stringify(obj2);
  var result2 = JSON.parse(myJSON2);
  for (var i = 0; i < result.length; i++) {
    var tabs =
      `<a class="nav-link" id="custom-tabs-one-${result[i].SWITCHING}-tab"
    data-toggle="pill" href="#custom-tabs-one-${result[i].SWITCHING}" role="tab" aria-controls="custom-tabs-one-${result[i].SWITCHING}"
     aria-selected="false">${result[i].SWITCHING}</a>`;
    createTabs = document.createElement('li');
    createTabs.setAttribute('class', 'nav-item');
    createTabs.innerHTML += tabs;
    tabed.appendChild(createTabs);
      console.log(i);
      var tables =
        `<table class="table table-bordered table-striped ${result[i].SWITCHING}" id="${result[i].SWITCHING}">
            <thead align="center">
              <tr>
                <th class="" colspan="19">DATA ${result[i].SWITCHING} BULAN <label class="${result[i].SWITCHING}">-</label> TAHUN <label class="${result[i].SWITCHING}">-</label></th>
              </tr>
            </thead>
            <tbody >
            <tr id="${result[i].SWITCHING} head"></tr>
            <tr id="${result[i].SWITCHING} tanggal"></tr>
            </tbody>
          </table>`;
      createtables = document.createElement('div');
      createtables.setAttribute('class', 'tab-pane fade');
      createtables.setAttribute('id', 'custom-tabs-one-' + result[i].SWITCHING);
      createtables.setAttribute('role', 'tabpanel');
      createtables.setAttribute('aria-labelledby', 'custom-tabs-one-' + result[i].SWITCHING + '-tab');
      createtables.innerHTML += tables;
      divtable.appendChild(createtables);




    var tableProduk = document.getElementById(result[i].SWITCHING + " head");
    var tabelIsi = document.getElementById(result[i].SWITCHING + " tanggal");

    for (var j = 0; j < result2.length; j++) {
      if (j < 1 ){
        var tablesproduk = `<th align="center">TANGGAL</th>`
        tableProduk.innerHTML += tablesproduk;
      }
      if (result[i].SWITCHING == result2[j].SWITCHING) {
        var tablesproduk = `
        <th colspan="6">${result2[j].produk}</th>
        `
        tableProduk.innerHTML += tablesproduk;

        var tablesisi = `<td>${result2[j].tanggal}</td>`
        // tabelIsi.innerHTML += tablesisi;
        createTtanggal = document.createElement('tr');
        createTtanggal.setAttribute('align', 'center');
        createTtanggal.innerHTML += tablesisi;
        tabelIsi.appendChild(createTtanggal);
        console.log(tablesisi);
      }
    }

  }
}

function getSwitchingRekonT(){
  var tabed = document.getElementById('custom-tabs-one-tab');
  var divtable = document.getElementById('custom-tabs-one-tabContent');
  let xhr = new XMLHttpRequest();
  let url = "http://192.168.5.16:8080/produkreconbiller";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(this.responseText);
      var obj2 = [{
        SWITCHING: "BAKOEL",
        produk: "PDAM A",
        tanggal: "26/11/2020"
      }, {
        SWITCHING: "BIMASAKTI",
        produk: "PDAM B",
        tanggal: "26/11/2020"
      }, {
        SWITCHING: "MITRACOMM2",
        produk: "PDAM C",
        tanggal: "26/11/2020"
      }];
      var myJSON2 = JSON.stringify(obj2);
      var result2 = JSON.parse(myJSON2);
      for (var i = 0; i < result.length; i++) {
        var tabs =
          `<a class="nav-link" id="custom-tabs-one-${result[i].SWITCHING}-tab"
        data-toggle="pill" href="#custom-tabs-one-${result[i].SWITCHING}" role="tab" aria-controls="custom-tabs-one-${result[i].SWITCHING}"
         aria-selected="false">${result[i].SWITCHING}</a>`;
        createTabs = document.createElement('li');
        createTabs.setAttribute('class', 'nav-item');
        createTabs.innerHTML += tabs;
        tabed.appendChild(createTabs);
          console.log(i);
          var tables =
            `<table class="table table-bordered table-striped ${result[i].SWITCHING}" id="${result[i].SWITCHING}">
                <thead align="center">
                  <tr>
                    <th class="" colspan="19">DATA ${result[i].SWITCHING} BULAN <label class="${result[i].SWITCHING}">-</label> TAHUN <label class="${result[i].SWITCHING}">-</label></th>
                  </tr>
                </thead>
                <tbody >
                <tr id="${result[i].SWITCHING} head"></tr>
                <tr id="${result[i].SWITCHING} tanggal"></tr>
                </tbody>
              </table>`;
          createtables = document.createElement('div');
          createtables.setAttribute('class', 'tab-pane fade');
          createtables.setAttribute('id', 'custom-tabs-one-' + result[i].SWITCHING);
          createtables.setAttribute('role', 'tabpanel');
          createtables.setAttribute('aria-labelledby', 'custom-tabs-one-' + result[i].SWITCHING + '-tab');
          createtables.innerHTML += tables;
          divtable.appendChild(createtables);




        var tableProduk = document.getElementById(result[i].SWITCHING + " head");
        var tabelIsi = document.getElementById(result[i].SWITCHING + " tanggal");

        for (var j = 0; j < result2.length; j++) {
          if (j < 1 ){
            var tablesproduk = `<th align="center">TANGGAL</th>`
            tableProduk.innerHTML += tablesproduk;
          }
          console.log(result[i].SWITCHING + " - "+ result2[j].SWITCHING);
          if (result[i].SWITCHING == result2[j].SWITCHING) {
            var tablesproduk = `
            <th colspan="6">${result2[j].produk}</th>
            `
            tableProduk.innerHTML += tablesproduk;

            var tablesisi = `<td>${result2[j].tanggal}</td>`
            // tabelIsi.innerHTML += tablesisi;
            createTtanggal = document.createElement('tr');
            createTtanggal.setAttribute('align', 'center');
            createTtanggal.innerHTML += tablesisi;
            tabelIsi.appendChild(createTtanggal);
            console.log(tablesisi);
          }
        }

      }
    }
  };
  var data = JSON.stringify({
    "request": "tab"
  });
  xhr.send(data);
}

function getSwitchingRekonZ(){
  var tabed = document.getElementById('custom-tabs-one-tab');
  var divtable = document.getElementById('custom-tabs-one-tabContent');
  let xhr = new XMLHttpRequest();
  let url = "http://192.168.5.16:8080/produkreconbiller";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(this.responseText);
      for (var i = 0; i < result.length; i++) {
        var tabs =
          `<a class="nav-link" id="custom-tabs-one-${result[i].SWITCHING}-tab"
        data-toggle="pill" href="#custom-tabs-one-${result[i].SWITCHING}" role="tab" aria-controls="custom-tabs-one-${result[i].SWITCHING}"
         aria-selected="false">${result[i].SWITCHING}</a>`;
        createTabs = document.createElement('li');
        createTabs.setAttribute('class', 'nav-item');
        createTabs.innerHTML += tabs;
        tabed.appendChild(createTabs);
          console.log(i);
          var tables =
            `<table class="table table-bordered table-striped ${result[i].SWITCHING}" id="${result[i].SWITCHING}">
                <thead align="center">
                  <tr>
                    <th class="" colspan="19">DATA ${result[i].SWITCHING} BULAN <label class="${result[i].SWITCHING}">-</label> TAHUN <label class="${result[i].SWITCHING}">-</label></th>
                  </tr>
                </thead>
                <tbody >
                <tr id="${result[i].SWITCHING} head"></tr>
                <tr id="${result[i].SWITCHING} tanggal"></tr>
                </tbody>
              </table>`;
          createtables = document.createElement('div');
          createtables.setAttribute('class', 'tab-pane fade');
          createtables.setAttribute('id', 'custom-tabs-one-' + result[i].SWITCHING);
          createtables.setAttribute('role', 'tabpanel');
          createtables.setAttribute('aria-labelledby', 'custom-tabs-one-' + result[i].SWITCHING + '-tab');
          createtables.innerHTML += tables;
          divtable.appendChild(createtables);
        var tableProduk = document.getElementById(result[i].SWITCHING + " head");
        var tabelIsi = document.getElementById(result[i].SWITCHING + " tanggal");

      }
    }
  };
  var data = JSON.stringify({
    "request": "tab"
  });
  xhr.send(data);
}
function getSaldoBillerTEST(){
  var rpTES = document.getElementById('rpTES');
  var result='';


  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/getsaldo";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      saldo = JSON.parse(this.responseText);
      var saldoCPN = `${saldo.CPN.toLocaleString('en')}`

      appendgetsaldoCPN();

      cpn.innerHTML += saldoCPN

    }
  };
  var data = JSON.stringify({
    "method":"cek.balance","switching":"DANUCELL","limit":"50000000"
  });
  xhr.send();
}

function getTablesCompare(){
  var tabed = document.getElementById('custom-tabs-one-tab');
  var divtable = document.getElementById('custom-tabs-one-tabContent');
  let xhr = new XMLHttpRequest();
  let url = "http://192.168.5.16:8080/produkreconbiller";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(this.responseText);
      var obj2 = [{
        SWITCHING: "BAKOEL",
        produk: "PDAM A",
        tanggal: "26/11/2020"
      }, {
        SWITCHING: "BIMASAKTI",
        produk: "PDAM B",
        tanggal: "26/11/2020"
      }, {
        SWITCHING: "MITRACOMM2",
        produk: "PDAM C",
        tanggal: "26/11/2020"
      }];
      var myJSON2 = JSON.stringify(obj2);
      var result2 = JSON.parse(myJSON2);
      for (var i = 0; i < result.length; i++) {
        var tabs =
          `<a class="nav-link" id="custom-tabs-one-${result[i].SWITCHING}-tab"
        data-toggle="pill" href="#custom-tabs-one-${result[i].SWITCHING}" role="tab" aria-controls="custom-tabs-one-${result[i].SWITCHING}"
         aria-selected="false">${result[i].SWITCHING}</a>`;
        createTabs = document.createElement('li');
        createTabs.setAttribute('class', 'nav-item');
        createTabs.innerHTML += tabs;
        tabed.appendChild(createTabs);
          console.log(i);
          var tables =
            `<table class="table table-bordered table-striped ${result[i].SWITCHING}" id="${result[i].SWITCHING}">
                <thead align="center">
                  <tr>
                    <th class="" colspan="19">DATA ${result[i].SWITCHING} BULAN <label class="${result[i].SWITCHING}">-</label> TAHUN <label class="${result[i].SWITCHING}">-</label></th>
                  </tr>
                </thead>
                <tbody >
                <tr id="${result[i].SWITCHING} head"></tr>
                <tr id="${result[i].SWITCHING} tanggal"></tr>
                </tbody>
              </table>`;
          createtables = document.createElement('div');
          createtables.setAttribute('class', 'tab-pane fade');
          createtables.setAttribute('id', 'custom-tabs-one-' + result[i].SWITCHING);
          createtables.setAttribute('role', 'tabpanel');
          createtables.setAttribute('aria-labelledby', 'custom-tabs-one-' + result[i].SWITCHING + '-tab');
          createtables.innerHTML += tables;
          divtable.appendChild(createtables);




        var tableProduk = document.getElementById(result[i].SWITCHING + " head");
        var tabelIsi = document.getElementById(result[i].SWITCHING + " tanggal");

        for (var j = 0; j < result2.length; j++) {
          if (j < 1 ){
            var tablesproduk = `<th align="center">TANGGAL</th>`
            tableProduk.innerHTML += tablesproduk;
          }
          console.log(result[i].SWITCHING + " - "+ result2[j].SWITCHING);
          if (result[i].SWITCHING == result2[j].SWITCHING) {
            var tablesproduk = `
            <th colspan="6">${result2[j].produk}</th>
            `
            tableProduk.innerHTML += tablesproduk;

            var tablesisi = `<td>${result2[j].tanggal}</td>`
            // tabelIsi.innerHTML += tablesisi;
            createTtanggal = document.createElement('tr');
            createTtanggal.setAttribute('align', 'center');
            createTtanggal.innerHTML += tablesisi;
            tabelIsi.appendChild(createTtanggal);
            console.log(tablesisi);
          }
        }

      }
    }
  };
  var data = JSON.stringify({
    "request": "tab"
  });
  xhr.send(data);
}
