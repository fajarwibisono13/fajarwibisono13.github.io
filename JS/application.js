var userLogin;
var server = "34.101.235.147:555";

function loginPage() {
  window.location = "index";
}

function daftar() {
  window.location = "register";
}

function Register() {

  let noregis = document.getElementById('no_registrasi');
  let name = document.getElementById('nama');
  let username = document.getElementById('username');
  let password = document.getElementById('password');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/tambah_user_clients";

  // let modalbody = document.getElementById("modal-body");
  //
  // var Parent = document.getElementById('modal-body');
  //     while (Parent.hasChildNodes()) {
  //       Parent.removeChild(Parent.firstChild);
  //     }

  if (noregis.value != "" || name.value != "" || username.value != "" || password.value != "") {

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText.toUpperCase());
        console.log(status);

        for (var i = 0; i < status.length; i++) {
          if (status[i].STATUS == 'BERHASIL') {
            //alert(status[i].STATUS);
            //  ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            ModalRegister(status[i].STATUS + " - Username " + status[i].PESAN.USERNAME + " Sukses Terdaftar")
            window.location = "index";
          } else {
            //ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            //alert(status[i].STATUS);
            ModalRegister(status[i].STATUS + " - " + "PASTIKAN DATA YANG ANDA INPUTKAN BENAR");
          }
        };
      }
    };

    var data = JSON.stringify({
      "username": username.value,
      "password": password.value,
      "nama": nama.value,
      "no_registrasi": noregis.value
    });
    xhr.send(data);
    console.log(data);
  } else {
    //ModalShow();
    //modalbody.innerHTML += "Username, Nama, dan Password Tidak Boleh Kosong"
    ModalRegister("Username, Nama, No Registrasi, atau Password Tidak Boleh Kosong");
  }

}

function ModalRegister(message) {
  var modal = document.getElementById("modal_register");
  var Parent = document.getElementById('modal_register_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;

}

function ModalRegisterClose() {
  var modal = document.getElementById("modal_register");
  var Parent = document.getElementById('modal_register_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function Login() {
  let username = document.querySelector('#username');
  var password = document.querySelector('#password');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/login_clients";


  xhr.open("POST", url, true);
  xhr.timeout = 30000;
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    console.log(xhr.readyState + " " + xhr.status);
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(this.responseText);
      var status = JSON.parse(this.responseText.toUpperCase());
      console.log(status);
      for (var i = 0; i < status.length; i++) {
        if (status[i].STATUS == 'BERHASIL') {

          // localStorage.setItem("username", status[i].USERNAME);
          // localStorage.setItem("name", status[i].NAMA);
          // localStorage.setItem("hak_akses", status[i].HAK_AKSES);
          // localStorage.setItem("token", status[i].PESAN);
          localStorage.setItem("userLogin", status[i].USERNAME)
          localStorage.setItem("no_registrasi", status[i].NO_REGISTRASI)
          localStorage.setItem("nama", status[i].NAMA)
          localStorage.setItem("userLogin", status[i].USERNAME)
          ModalLogin(status[i].STATUS + " " + status[i].USERNAME);
          window.location = "home"
          //getMenu();
        } else {
          //  ModalShow();
          //modalbody.innerHTML +=status[i].PESAN;
          window.location = '#'
          ModalLogin(status[i].PESAN);
        }
      }

    }

  };
  xhr.abort();
  xhr.ontimeout = function() {
    //ModalShow();
    //modalbody.innerHTML += "Connection Timeout, Please Check Servers";
    alert("Connection Timeout, Please Check Servers");
  };

  var data = JSON.stringify({
    "username": username.value,
    "password": password.value
  });
  xhr.send(data);

}

function ModalLogin(message) {
  var modal = document.getElementById("modal_login");
  var Parent = document.getElementById('modal_login_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;

}

function ModalLoginClose() {
  var modal = document.getElementById("modal_login");
  var Parent = document.getElementById('modal_login_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function ModalHome(message) {
  var modal = document.getElementById("modal_home");
  var Parent = document.getElementById('modal_home_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;

}

function ModalHomeClose() {
  var modal = document.getElementById("modal_home");
  var Parent = document.getElementById('modal_home_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function sucessLogin() {
  if (localStorage.getItem("userLogin") != null) {
    let usernames = document.querySelector('.userlogin');
    usernames.innerHTML = localStorage.getItem("userLogin");
    console.log(localStorage.getItem("userLogin"));
  } else {
    ModalHome("Anda Tidak Berhak Mengakses Halaman Ini, Silahkan Login")
    window.location = "index"
  }
}

function postingKemandirian() {
  var noregis = localStorage.getItem("no_registrasi");
  var kemandirian = document.getElementById("status_kemandirian");
  var nama_perusahaan = document.getElementById("nama_perusahaan").value;
  var jabatan = document.getElementById("posting_jabatan").value;
  var alamat = document.getElementById("alamat").value;
  var file = document.getElementById("inpFile");
  var data = new FormData();
  data.append(noregis, file.files[0], file.value);
  data.append("status_kemandirian", kemandirian.value);
  data.append("perusahaan", nama_perusahaan);
  data.append("jabatan", jabatan);
  data.append("username", localStorage.getItem("userLogin"));
  data.append("alamat_perusahaan", nama_perusahaan);

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      result = JSON.parse(this.responseText);
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        ModalPosting(result[i].STATUS);
        window.location ="home";
      }
    }
  });

  xhr.open("POST", "http://" + server + "/posting_kemandirian");
  console.log(data)
  xhr.send(data);

}

function ModalPosting(message) {
  var modal = document.getElementById("modal_posting");
  var Parent = document.getElementById('modal_posting_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;
}

function ModalPostingClose() {
  var modal = document.getElementById("modal_posting");
  var Parent = document.getElementById('modal_posting_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function ModalDelete(message) {
  var modal = document.getElementById("modal_posting");
  var Parent = document.getElementById('modal_posting_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;
}

function ModalPostingClose() {
  var modal = document.getElementById("modal_posting");
  var Parent = document.getElementById('modal_posting_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function getPhoto2(noregis, length) {
  console.log(length)
  var image = document.getElementById('forImage0');
  for (i = 0; i < (length); i++) {
    console.log(length)
    console.log(i)
    var image = document.getElementById('forImage' + (i + 1));
    image.innerHTML += `<center><img src="img/undraw1.png" alt="" width="300" height="300"></center>`
  }




}

function Logout() {
  localStorage.clear();
  window.location = "index";
}

function Logout() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/logout_clients";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  // Create a state change callback
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(this.responseText);
      var status = JSON.parse(this.responseText.toUpperCase());
      console.log(status);
      for (var i = 0; i < status.length; i++) {
        if (status[i].STATUS == 'BERHASIL') {
          window.location = 'index'
          localStorage.clear();
        } else {
          window.location = '#'
        }
      }
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({
    "username": localStorage.getItem("userLogin")
  });
  // Sending data with the request
  xhr.send(data);
}

function getProfile() {
  let username = document.getElementById("usernameChangePassword");
  let name = document.getElementById("namaChangePassword");
  let noregis = document.getElementById("noRegisChangePassword");

  username.innerHTML += localStorage.getItem("userLogin");
  name.innerHTML += localStorage.getItem("nama");
  noregis.innerHTML += localStorage.getItem("no_registrasi");
}

function changePassword() {
  let oldPassword = document.querySelector('#password');
  let newPassword = document.querySelector('#new-password');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/change_password_clients";

  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var status = JSON.parse(this.responseText);
      for (var i = 0; i < status.length; i++) {
        if (status[i].STATUS == 'BERHASIL') {
          //  ModalShow();
          //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
          ModalProfile("Password Berhasil Di Ganti, Silahkan Login Ulang");
          Logout();
        } else {
          ModalProfile(status[i].STATUS + "- " + status[i].PESAN);
          //ModalShow();
          //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
        }
      }

    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({
    "username": localStorage.getItem("userLogin"),
    "old_password": oldPassword.value,
    "new_password": newPassword.value
  });
  // Sending data with the request
  xhr.send(data);
  console.log(data);
  console.log(username);
}

function ModalProfile(message) {
  var modal = document.getElementById("modal_profile");
  var Parent = document.getElementById('modal_profile_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";

  Parent.innerHTML = message;

}

function ModalProfileClose() {
  var modal = document.getElementById("modal_profile");
  var Parent = document.getElementById('modal_profile_body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "none";

  Parent.innerHTML = message;
}

function cekKemandirian() {
  var username = localStorage.getItem("userLogin");
  var noregis = localStorage.getItem("no_registrasi");
  var konten = document.getElementById("konten_kemandirian");
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/" + "get_all_kemandirian";

  var Parent = document.getElementById('konten_kemandirian');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }

  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        konten.innerHTML +=
          `
          <div class="col-md-6">
              <!-- Box Comment -->
              <div class="card card-widget">
                <div class="card-header">
                  <div class="user-block">
                    <img class="img-circle" src="img/profile.png" alt="User Image">
                    <span class="username"><a href="#">${result[i].nama_lengkap}</a></span>
                    <span class="description">${result[i].jam_proses} ${result[i].tanggal_proses}</span>
                  </div>
                  <!-- /.user-block -->
                  <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-toggle="tooltip" title="Mark as read">
                      <i class="far fa-circle"></i></button>
                    <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                    </button>
                  </div>
                  <!-- /.card-tools -->
                </div>
          <div class="card-body">
          <table class="table table-bordered dataTable" id="tbpostingan${i}" width="100%" cellspacing="0">
          <tbody>
            <tr>
                <td id="forImage${i}" class="font-weight-bold" colspan="2">
                </td>
            </tr>
            <tr>
                <td class="font-weight-bold">No Registrasi</td>
                <td>${result[i].no_registrasi}</td>
            </tr>
            <tr>
                <td class="font-weight-bold">Nama</td>
                <td>${result[i].nama_lengkap}</td>
            </tr>
              <tr>
                  <td class="font-weight-bold">Kemandirian</td>
                  <td>${result[i].kemandirian}</td>
              </tr>
              <tr>
                  <td class="font-weight-bold">Nama Perusahaan / Lembaga / dsb</td>
                  <td >${result[i].perusahaan}</td>
              </tr>
              <tr>
                  <td class="font-weight-bold">Alamat</td>
                  <td >${result[i].alamat_perusahaan}</td>
              </tr>
              <tr>
                  <td class="font-weight-bold">Jabatan</td>
                  <td >${result[i].jabatan}</td>
              </tr>
              <tr>
    <td class="font-weight-bold">Tanggal Posting</td>
    <td >${result[i].tanggal_proses}</td>
</tr>
<tr>
    <td class="font-weight-bold">Waktu Posting</td>
    <td >${result[i].jam_proses}</td>
</tr>
<tr>
              <tr>
                  <td class="font-weight-bold">Diposting Oleh</td>
                  <td >${result[i].username}</td>
              </tr>
              <tr>
              <td id="forImage${i}" class="font-weight-bold" colspan="2">
              <button onClick="deletePostingan(${i})" id="deletePosting" name="${i}" class="btn btn-primary btn-block">Delete</button>
              </td>
              </tr>
          </tbody>
      </table>
      </div>
      </div>
    </div>`


      }
      getPhoto1(noregis, username);
      getPhoto2(noregis, result.length);
    }
  };
  var data = JSON.stringify({
    "username": username,
    "no_registrasi": noregis
  });
  xhr.send(data);

}

function getPhoto2(noregis, length) {
  console.log(length)
  var image = document.getElementById('forImage0');
  for (i = 0; i < (length); i++) {
    console.log(length)
    console.log(i)
    var image = document.getElementById('forImage' + (i + 1));
    image.innerHTML += `<center><img src="img/undraw1.png" alt="" width="300" height="300"></center>`
  }




}

function getPhoto1(noregis, username) {

  var image = document.getElementById('forImage0');

  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_photo_kemandirian";
  xhr.responseType = "blob";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.response);
      var blob = new Blob([(xhr.response)], {
        type: 'image/jpeg'
      });
      console.log(blob)

      var fileURL = URL.createObjectURL(blob);
      image.innerHTML += `<center><img src="${fileURL}" alt="" width="300" height="300"></center>`
    }
  };
  var data = JSON.stringify({
    "username": username,
    "no_registrasi": noregis
  });

  xhr.send(data);

}

function deletePostingan(number) {
  var tb = document.getElementById("tbpostingan" + number);
  var cek = tb.rows;
  var rows = document.getElementById("tbpostingan" + number).getElementsByTagName("td");
  console.log(rows[2].innerText);
  console.log(rows[4].innerText);
  console.log(rows[6].innerText);
  console.log(rows[8].innerText);
  console.log(rows[10].innerText);
  console.log(rows[12].innerText);
  console.log(rows[14].innerText);
  console.log(rows[16].innerText);
  console.log(rows[18].innerText);

  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/" + "delete_posting";

  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      for (var i = 0; i < result.length; i++) {
        ModalHome(result[i].STATUS);
        window.location = "home";
      }
    }
  };
  var data = JSON.stringify({
    "username": localStorage.getItem("userLogin"),
    "no_registrasi": rows[2].innerText,
    "kemandirian": rows[6].innerText,
    "tanggal_proses": rows[14].innerText.split("-").reverse().join(""),
    "jam_proses": rows[16].innerText,
    "perusahaan": rows[8].innerText,
    "alamat_perusahaan": rows[10].innerText,
    "jabatan": rows[12].innerText
  });
  xhr.send(data);
  console.log(data);
}


//====================================BATAS======================================//
function getMenu() {
  let username = document.querySelector('#username');
  var password = document.querySelector('#password');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_menu";

  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(this.responseText);
      localStorage.setItem("menu", this.responseText);
      console.log(this.responseText);
      valueMenu();
      //localStorage.removeItem("password");

    }
  };
  var data = JSON.stringify({
    "username": username.value,
    "password": password.value
  });
  xhr.send(data);
}

function valueMenu() {
  var result = JSON.parse(localStorage.getItem("menu"));
  //var result = results;
  var menuClient = document.getElementById('menuClient');
  var menuPembimbing = document.getElementById('menuPembimbing');
  var menuTools = document.getElementById('menuTools');
  var menuAccount = document.getElementById('menuAccount');
  for (var i = 0; i < result.length; i++) {


    if (result[i].main_menu == "Client") {
      var option =
        `<li class="nav-item">
          <a href="${result[i].link}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>${result[i].sub_menu}</p>
          </a>
        </li>`
      submenu = document.createElement('li');
      submenu.innerHTML += option
      menuClient.appendChild(submenu);
    } else if (result[i].main_menu == "Pembimbing") {
      var option =
        `<li class="nav-item">
          <a href="${result[i].link}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>${result[i].sub_menu}</p>
          </a>
        </li>`
      submenu = document.createElement('li');
      submenu.innerHTML += option
      menuPembimbing.appendChild(submenu);
    } else if (result[i].main_menu == "Tools") {
      var option =
        `<li class="nav-item">
          <a href="${result[i].link}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>${result[i].sub_menu}</p>
          </a>
        </li>`
      submenu = document.createElement('li');
      submenu.innerHTML += option
      menuTools.appendChild(submenu);
    } else if (result[i].main_menu == "Account") {
      var option =
        `<li class="nav-item">
          <a href="${result[i].link}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>${result[i].sub_menu}</p>
          </a>
        </li>`
      submenu = document.createElement('li');
      submenu.innerHTML += option
      menuAccount.appendChild(submenu);
    }
  }

}



function GetUserLogin() {
  let userlogin = document.querySelector('.userlogin');
  let usernameChangePassword = document.getElementById('usernameChangePassword');
  let namaChangePassword = document.getElementById('namaChangePassword');
  userlogin.innerHTML = localStorage.getItem("name").toUpperCase();
  usernameChangePassword.innerHTML = localStorage.getItem("username").toUpperCase();
  namaChangePassword.innerHTML = localStorage.getItem("name").toUpperCase();
}


function GetUser() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_user";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      user = JSON.parse(this.responseText);
      console.log(user);
      builTable();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);
}

function builTable() {

  var table = document.getElementById('tbuser')
  for (var i = 0; i < user.length; i++) {
    var row = `<tr align="Center">
                <td>${user[i].username}</td>
                <td>${user[i].nama}</td>
                <td>${user[i].hak_akses}</td>
                <td><button onclick="resetPassword()" class="btn btn-primary btn-block">Reset</button></td>
                <td><button onClick="deleteUser()" class="btn btn-primary btn-block">Delete</button></td>
                </tr>`
    table.innerHTML += row
  }
}

function getHakAkses() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_hak_akses";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueHakAkses()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueHakAkses() {
  var select = document.getElementById('selectHakAkses')
  for (var i = 0; i < result.length; i++) {
    var option = `<tr align="Center">
                <option value="${result[i].id}">${result[i].nama}</option>
                </tr>`
    select.innerHTML += option
  }
}


function resetPassword() {
  let user;
  //let modalbody = document.getElementById("modal-body");

  // var Parent = document.getElementById('modal-body');
  //     while (Parent.hasChildNodes()) {
  //       Parent.removeChild(Parent.firstChild);
  //     }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbuser').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      user = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/reset_password";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - Password telah di reset menjadi" + status[i].PESAN);
              window.location = "user";
            } else {
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - " + status[i].PESAN);
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "username_target": user
      });
      xhr.send(data);
      console.log(data);
    }
  }
}

function deleteUser() {
  let user;
  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbuser').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      user = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/delete_user";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - " + status[i].PESAN);
              window.location = "user";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "username_target": user
      });
      xhr.send(data);
    }
  }

}

function getListPendaftaran() {
  overlayOn();
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_clients";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      overlayOf();
      result = JSON.parse(this.responseText);
      console.log(result);
      buildDaftarPendaftaran();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}

function buildDaftarPendaftaran() {
  //var table = document.getElementById('tbwarga')
  $(document).ready(function() {
    var data = [];
    for (var i = 0; i < result.length; i++) {
      var tombolapprove;
      var tombolreject;
      var tombolpending;
      if (result[i].status_pendaftaran == "Rejected" || result[i].status_pendaftaran == "Approved") {
        tombolapprove = "-";
        tombolreject = "-";
        tombolpending = "-";
      } else if (result[i].status_pendaftaran == "Pending") {
        tombolapprove = `<button onClick="ApproveDaftar()" class="btn btn-info btn-block">Approve</button>`;
        tombolreject = `<button onClick="rejectDaftar()" class="btn btn-danger btn-block">Reject</button>`;
        tombolpending = "-";
      } else {
        tombolapprove = `<button onClick="ApproveDaftar()" class="btn btn-info btn-block">Approve</button>`;
        tombolreject = `<button onClick="rejectDaftar()" class="btn btn-danger btn-block">Reject</button>`;
        tombolpending = `<button onClick="pendingDaftar()" class="btn btn-warning btn-block">Pending</button>`;
      }
      data.push([
        result[i].no_resistrasi, result[i].nik, result[i].nama_lengkap, result[i].asal_daerah, result[i].tempat_lahir,
        result[i].tanggal_lahir, result[i].umur, result[i].jenis_kelamin, result[i].pendidikan_terakhir, result[i].keterangan_tinggal, result[i].keterampilan, result[i].ekskul,
        result[i].nama_ayah, result[i].nama_ibu, result[i].keterangan_ortu, result[i].nama_nohp,
        result[i].nohp, result[i].status_pendaftaran, result[i].tanggal_proses, tombolapprove, tombolreject, tombolpending
      ]);
    }

    //overlayDataWarga();

    $('#example1').DataTable({
      data: data,
      // scroller:       true,
      // scrollCollapse: true,
      // deferRender:    true,
      // scrollY:        500
    });
  });
}

function overlayOf() {
  var overlay = document.getElementById("overlay");
  var loading = document.getElementById("loading");

  overlay.style.display = "none";
  loading.style.display = "none";
}

function overlayOn() {
  var overlay = document.getElementById("overlay");
  var loading = document.getElementById("loading");

  overlay.style.display = "block";
  loading.style.display = "block";
}

function getEskul() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_ekskul";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      user = JSON.parse(this.responseText);
      console.log("ini respon" + user);
      builTableEskul();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);
}

function builTableEskul() {

  var table = document.getElementById('tbuser')
  for (var i = 0; i < user.length; i++) {
    var row = `<tr align="Center">
                                <td>${user[i].id}</td>
                                <td>${user[i].nama}</td>
                                <td>${user[i].penanggung_jawab}</td>
                                <td><button onClick="deleteEskul()" class="btn btn-primary btn-block">Delete</button></td>
                                </tr>`
    table.innerHTML += row
  }
}


function getListPembimbing() {
  overlayOn();
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_pembimbing";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      overlayOf();
      result = JSON.parse(this.responseText);
      console.log(result);
      buildDaftarPembimbing();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}

function getListPembimbing2() {
  var pembimbing = document.getElementById("pembimbing");
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_pembimbing";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      namaPembimbing = JSON.parse(this.responseText);
      for (var i = 0; i < namaPembimbing.length; i++) {
        var option = `
                    <option value="${namaPembimbing[i].nama_lengkap}">${namaPembimbing[i].nama_lengkap}</option>
                    `
        pembimbing.innerHTML += option
      }

    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}

function buildDaftarPembimbing() {
  //var table = document.getElementById('tbwarga')
  $(document).ready(function() {
    var data = [];
    var status;
    for (var i = 0; i < result.length; i++) {
      var aktip = `<td><button onClick="changeStatusPembimbing()" value="${result[i].status}" class="btn btn-success btn-block">${result[i].status}</button></td>`;
      var nonaktip = `<td><button onClick="changeStatusPembimbing()" value="${result[i].status}" class="btn btn-danger btn-block">${result[i].status}</button></td>`;
      if (result[i].status == "AKTIF") {
        status = aktip;
      } else {
        status = nonaktip;
      }
      data.push([
        result[i].nik, result[i].nama_lengkap, result[i].tempat_lahir, result[i].tanggal_lahir,
        result[i].jenis_kelamin, result[i].umur, status,

        `<td><button onClick="deletePembimbing()" class="btn btn-info btn-block">Delete</button></td>`
      ]);
    }

    //overlayDataWarga();

    $('#example1').DataTable({
      data: data,
      // scroller:       true,
      // scrollCollapse: true,
      // deferRender:    true,
      // scrollY:        500
    });
  });
}

function RegisterPembimbing() {

  let nik = document.getElementById('nik');
  let nama = document.getElementById('name');
  let tgllahir = document.getElementById('tgllahir');
  let tempatlahir = document.getElementById('tempat_lahir');
  let jk = document.getElementById('jk');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/tambah_pembimbing";

  // let modalbody = document.getElementById("modal-body");
  //
  // var Parent = document.getElementById('modal-body');
  //     while (Parent.hasChildNodes()) {
  //       Parent.removeChild(Parent.firstChild);
  //     }

  if (nik.value != "" || nama.value != "" || tgllahir.value != "" ||
    tempatlahir.value != "" || jk.value != "") {

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText.toUpperCase());
        console.log(status);

        for (var i = 0; i < status.length; i++) {
          if (status[i].STATUS == 'BERHASIL') {
            //alert(status[i].STATUS);
            //  ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            alert(status[i].STATUS + " - Pembimbing " + status[i].PESAN.NAMA_LENGKAP + " Sukses Terdaftar");
            //window.location = "tambah-pembimbing";
          } else {
            //ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            //alert(status[i].STATUS);
            alert(status[i].STATUS + " - " + status[i].PESAN);
          }
        };
      }
    };

    var data = JSON.stringify({
      "token": localStorage.getItem("token"),
      "username": localStorage.getItem("username"),
      "nik": nik.value,
      "nama_lengkap": nama.value,
      "tempat_lahir": tempatlahir.value,
      "tanggal_lahir": tgllahir.value.replace(/-/g, ""),
      "jenis_kelamin": jk.value
    });
    xhr.send(data);
    console.log(data);
  } else {
    //ModalShow();
    //modalbody.innerHTML += "Username, Nama, dan Password Tidak Boleh Kosong"
    alert("Data Harus Terisi Semua");
  }

}

function testdelet() {
  // var oTable = $('#example').DataTable();
  // $('#button').click( function () {
  //       var oData = oTable.rows('.selected').data();
  //       for (var i=0; i < oData.length ;i++){
  //          alert("Name: " + oData[i][0] + " Position: " + oData[i][1] + " Office: " + oData[i][2]);
  //       }
  //
  //   } );
  alert("tes woy");


}

function deletePembimbing() {
  let nik;
  let nama;
  let tempat;
  let tanggal;
  let jk;
  let umur;
  let status;
  let validasistatus;
  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      nik = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      nama = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      tempat = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(2).innerHTML);
      tanggal = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(3).innerHTML);
      jk = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(4).innerHTML);
      umur = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(5).innerHTML);
      status = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(6).innerHTML);

      if (status.includes("NON")) {
        validasistatus = "NON AKTIF"
      } else {
        validasistatus = "AKTIF"
      }
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/delete_pembimbing";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - Pembimbing " + status[i].PESAN.NAMA_LENGKAP + " telah dihapus");
              window.location = "daftar-pembimbing";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "nik": nik,
        "nama_lengkap": nama,
        "tempat_lahir": tempat,
        "tanggal_lahir": tanggal.split("-").reverse().join("-"),
        "jenis_kelamin": jk,
        "umur": umur,
        "status": validasistatus
      });

      xhr.send(data);
      console.log(data);
    }
  }

}

function changeStatusPembimbing() {
  let nik;
  let nama;
  let tempat;
  let tanggal;
  let jk;
  let umur;
  let status;
  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      nik = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      nama = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      tempat = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(2).innerHTML);
      tanggal = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(3).innerHTML);
      jk = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(4).innerHTML);
      umur = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(5).innerHTML);
      status = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(6).innerHTML);
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/update_pembimbing";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - Pembimbing " + status[i].PESAN.NEW_NAMA_LENGKAP + " telah " + status[i].PESAN.NEW_STATUS);
              window.location = "daftar-pembimbing";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "old_nik": nik,
        "old_nama_lengkap": nama,
        "old_tempat_lahir": tempat,
        "old_tanggal_lahir": tanggal.split("-").reverse().join("-"),
        "old_jenis_kelamin": jk,
        "old_umur": umur,
        "old_status": "AKTIF",
        "new_nik": nik,
        "new_nama_lengkap": nama,
        "new_tempat_lahir": tempat,
        "new_tanggal_lahir": tanggal.split("-").reverse().join("-"),
        "new_jenis_kelamin": jk,
        "new_umur": umur,
        "new_status": "NON AKTIF"
      });
      var data2 = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "old_nik": nik,
        "old_nama_lengkap": nama,
        "old_tempat_lahir": tempat,
        "old_tanggal_lahir": tanggal.split("-").reverse().join("-"),
        "old_jenis_kelamin": jk,
        "old_umur": umur,
        "old_status": "NON AKTIF",
        "new_nik": nik,
        "new_nama_lengkap": nama,
        "new_tempat_lahir": tempat,
        "new_tanggal_lahir": tanggal.split("-").reverse().join("-"),
        "new_jenis_kelamin": jk,
        "new_umur": umur,
        "new_status": "AKTIF"
      });

      if (status.includes("NON")) {
        xhr.send(data2);
      } else {
        xhr.send(data);
      }

      console.log(data);
    }
  }

}

function RegisterEskul() {

  let id = document.querySelector('#id-eskul');
  let nama = document.querySelector('#nama-eskul');
  let pic = document.querySelector('#pic-eskul');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/tambah_ekskul";

  // let modalbody = document.getElementById("modal-body");
  //
  // var Parent = document.getElementById('modal-body');
  //     while (Parent.hasChildNodes()) {
  //       Parent.removeChild(Parent.firstChild);
  //     }

  if (id.value != "" || nama.value != "" || pic.value != "") {

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText.toUpperCase());
        console.log(status);

        for (var i = 0; i < status.length; i++) {
          if (status[i].STATUS == 'BERHASIL') {
            //alert(status[i].STATUS);
            //  ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            alert(status[i].STATUS + " - Ekstrakulikuler " + status[i].PESAN.NAMA_EKSKUL + " Sukses Terdaftar");
            window.location = "ekstrakulikuler";
          } else {
            //ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            //alert(status[i].STATUS);
            alert(status[i].STATUS + " - " + status[i].PESAN);
          }
        };
      }
    };

    var data = JSON.stringify({
      "token": localStorage.getItem("token"),
      "username": localStorage.getItem("username"),
      "id_ekskul": id.value,
      "nama_ekskul": nama.value,
      "nama_lengkap": pic.value
    });
    xhr.send(data);
    console.log(data);
  } else {
    //ModalShow();
    //modalbody.innerHTML += "Username, Nama, dan Password Tidak Boleh Kosong"
    alert("ID, Eskul, dan Penanggung Jawab tidak boleh kosong");
  }

}

function deleteEskul() {
  let id;
  let eskul;
  let pic;
  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbuser').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      id = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      eskul = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      pic = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(2).innerHTML);
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/delete_ekskul";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - ekstrakulikuler " + status[i].PESAN.NAMA_EKSKUL + " telah dihapus");
              window.location = "ekstrakulikuler";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "id_ekskul": id,
        "nama_ekskul": eskul,
        "nama_lengkap": pic
      });
      xhr.send(data);
    }
  }

}

function getKeterampilan2() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_keterampilan";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      user = JSON.parse(this.responseText);
      console.log("ini respon" + user);
      builTableKeterampilan();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);
}

function builTableKeterampilan() {

  var table = document.getElementById('tbuser')
  for (var i = 0; i < user.length; i++) {
    var row = `<tr align="Center">
                                <td>${user[i].id}</td>
                                <td>${user[i].nama}</td>
                                <td>${user[i].penanggung_jawab}</td>
                                <td><button onClick="deleteKeterampilan()" class="btn btn-primary btn-block">Delete</button></td>
                                </tr>`
    table.innerHTML += row
  }
}

function RegisterKeterampilan() {

  let id = document.querySelector('#id-keterampilan');
  let nama = document.querySelector('#nama-keterampilan');
  let pic = document.querySelector('#pic-keterampilan');
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/tambah_keterampilan";

  // let modalbody = document.getElementById("modal-body");
  //
  // var Parent = document.getElementById('modal-body');
  //     while (Parent.hasChildNodes()) {
  //       Parent.removeChild(Parent.firstChild);
  //     }

  if (id.value != "" || nama.value != "" || pic.value != "") {

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText.toUpperCase());
        console.log(status);

        for (var i = 0; i < status.length; i++) {
          if (status[i].STATUS == 'BERHASIL') {
            //alert(status[i].STATUS);
            //  ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            alert(status[i].STATUS + " - Keterampilan " + status[i].PESAN.NAMA_KETERAMPILAN + " Sukses Terdaftar");
            window.location = "keterampilan.html";
          } else {
            //ModalShow();
            //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            //alert(status[i].STATUS);
            alert(status[i].STATUS + " - " + status[i].PESAN);
          }
        };
      }
    };

    var data = JSON.stringify({
      "token": localStorage.getItem("token"),
      "username": localStorage.getItem("username"),
      "id_keterampilan": id.value,
      "nama_keterampilan": nama.value,
      "nama_lengkap": pic.value
    });
    xhr.send(data);
    console.log(data);
  } else {
    //ModalShow();
    //modalbody.innerHTML += "Username, Nama, dan Password Tidak Boleh Kosong"
    alert("ID, Keterampilan, dan Penanggung Jawab tidak boleh kosong");
  }

}

function deleteKeterampilan() {
  let id;
  let keterampilan;
  let pic;
  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbuser').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      id = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      keterampilan = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      pic = (document.getElementById("tbuser").rows[this.rowIndex - 1].cells.item(2).innerHTML);
      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/delete_keterampilan";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - Keterampilan " + status[i].PESAN.NAMA_KETERAMPILAN + " telah dihapus");
              window.location = "keterampilan.html";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "id_keterampilan": id,
        "nama_keterampilan": keterampilan,
        "nama_lengkap": pic
      });
      xhr.send(data);
    }
  }

}

function rejectDaftar() {
  let noregis;
  var dateProses = new Date();

  var month;
  if (dateProses.getMonth() < 10) {
    month = "0" + (dateProses.getMonth() + 1);
  } else {
    month = (dateProses.getMonth() + 1);
  }

  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);

      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/verifikasi_clients";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - No Registrasi " + status[i].PESAN.NO_REGISTRASI + " berhasil di reject");
              window.location = "list-pendaftaran";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              window.location = "list-pendaftaran";
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "no_registrasi": noregis,
        "status_pendaftaran": "3",
        "tanggal_proses": dateProses.getFullYear().toString() + month.toString() + dateProses.getDate().toString()
      });

      xhr.send(data);
      console.log(data);
    }
  }

}

function pendingDaftar() {
  let noregis;
  var dateProses = new Date();

  var month;
  if (dateProses.getMonth() < 10) {
    month = "0" + (dateProses.getMonth() + 1);
  } else {
    month = (dateProses.getMonth() + 1);
  }

  // let modalbody = document.getElementById("modal-body");
  // var Parent = document.getElementById('modal-body');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);

      //  alert(user);
      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/verifikasi_clients";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              //  ModalShow();
              //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
              alert(status[i].STATUS + " - No Registrasi " + status[i].PESAN.NO_REGISTRASI + " berhasil di pending");
              window.location = "list-pendaftaran";
            } else {
              alert(status[i].STATUS + " - " + status[i].PESAN);
              window.location = "list-pendaftaran";
              //ModalShow();
              //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "no_registrasi": noregis,
        "status_pendaftaran": "2",
        "tanggal_proses": dateProses.getFullYear().toString() + month.toString() + dateProses.getDate().toString()
      });

      xhr.send(data);
      console.log(data);
    }
  }

}

// function approveDaftar2() {
//   let noregis;
//   var dateProses = new Date();
//
//   var month;
//    if (dateProses.getMonth() < 10){
//      month = "0"+(dateProses.getMonth()+1);
//    }else{
//      month = (dateProses.getMonth()+1);
//    }
//
//   // let modalbody = document.getElementById("modal-body");
//   // var Parent = document.getElementById('modal-body');
//   // while (Parent.hasChildNodes()) {
//   //   Parent.removeChild(Parent.firstChild);
//   // }
//   if (!document.getElementsByTagName || !document.createTextNode) return;
//   var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
//   for (i = 0; i < rows.length; i++) {
//     rows[i].onclick = function() {
//       noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);
//
//       //  alert(user);
//       let xhr = new XMLHttpRequest();
//       let url = "http://" + server + "/verifikasi_clients";
//       xhr.open("POST", url, true);
//       xhr.setRequestHeader("Content-Type", "text/plain");
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//           // Print received data from server
//           var status = JSON.parse(this.responseText.toUpperCase());
//           console.log(status);
//           for (var i = 0; i < status.length; i++) {
//             if (status[i].STATUS == 'BERHASIL') {
//               //  ModalShow();
//               //  modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
//             } else {
//               //ModalShow();
//               //modalbody.innerHTML += status[i].STATUS +", - USERNAME "+ status[i].USERNAME +" "+ status[i].PESAN;
//             }
//           }
//         }
//       };
//       var data = JSON.stringify({
//         "token": localStorage.getItem("token"),
//         "username": localStorage.getItem("username"),
//         "no_registrasi":noregis,
//         "status_pendaftaran":"1",
//         "tanggal_proses":dateProses.getFullYear().toString()+month.toString()+dateProses.getDate().toString()
//       });
//
//       xhr.send(data);
//       console.log(data);
//         }
//   }
//
// }

function ApproveDaftar() {

  let noregis;
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(0).innerHTML);
      localStorage.setItem("noregis-approve", noregis)
      getListPembimbing2();
      getStatusClient2();
      ModalShow();
    }
  }
}

function prosesApprove() {

  var dateProses = new Date();

  var month;
  if (dateProses.getMonth() < 10) {
    month = "0" + (dateProses.getMonth() + 1);
  } else {
    month = (dateProses.getMonth() + 1);
  }

  var date;
  if (dateProses.getDate() < 10) {
    date = "0" + (dateProses.getDate() + 1);
  } else {
    date = (dateProses.getDate() + 1);
  }

  let namaPembimbing = document.getElementById("pembimbing");
  let statusClient = document.getElementById("status");
  let tgl = document.getElementById("tgl");
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/verifikasi_clients";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Print received data from server
      var status = JSON.parse(this.responseText.toUpperCase());
      console.log(status);
      for (var i = 0; i < status.length; i++) {
        if (status[i].STATUS == 'BERHASIL') {
          alert(status[i].STATUS + " - " + status[i].PESAN.NO_REGISTRASI + " Berhasil di proses");
          //window.location = "list-pendaftaran";

        } else {
          alert(status[i].STATUS);
          //  window.location = "list-pendaftaran";
        }
      }
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username"),
    "no_registrasi": localStorage.getItem("noregis-approve"),
    "nama_pembimbing": namaPembimbing.value,
    "tanggal_masuk": tgl.value.replace(/-/g, ""),
    "status_client": statusClient.value,
    "status_pendaftaran": "4",
    "tanggal_proses": dateProses.getFullYear().toString() + month.toString() + date.toString()
  });

  xhr.send(data);
  console.log(data);
}

function deleteClients() {
  let noregis;
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);

      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/delete_verified_clients";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Print received data from server
          var status = JSON.parse(this.responseText.toUpperCase());
          console.log(status);
          for (var i = 0; i < status.length; i++) {
            if (status[i].STATUS == 'BERHASIL') {
              alert(status[i].STATUS + " - " + status[i].PESAN.NO_REGISTRASI + " Berhasil di proses");
              //  window.location = "list-pendaftaran";

            } else {
              alert(status[i].STATUS);
              //    window.location = "list-pendaftaran";
            }
          }
        }
      };
      var data = JSON.stringify({
        "token": localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
        "no_registrasi": noregis
      });

      xhr.send(data);
      console.log(data);

    }
  }
}

function getListClient() {
  overlayOn();
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_verified_clients";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      overlayOf();
      result = JSON.parse(this.responseText);
      console.log(result);
      buildDaftarClients();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}

function buildDaftarClients() {
  //var table = document.getElementById('tbwarga')
  $(document).ready(function() {
    var data = [];
    var dokumen = `<div class="btn-group">
                        <button type="button" class="btn bg-maroon" onClick="showDokumen()">Lihat</button>
                        <button type="button" class="btn btn-info" onClick="uploadDokumen()">Upload</button>
                      </div>`
    var tombol = `<div class="btn-group">
                        <button type="button" class="btn btn-warning" onClick="ModalShowEdit()"> Edit </button>
                        <button type="button" class="btn btn-danger" onClick="deleteClients()"> Delete </button>
                      </div>`
    var status;

    for (var i = 0; i < result.length; i++) {
      // var tombolapprove;
      // var tombolreject;
      // var tombolpending;
      // if(result[i].status_pendaftaran == "Rejected" || result[i].status_pendaftaran == "Approved"){
      //   tombolapprove = "-";
      //   tombolreject = "-";
      //   tombolpending = "-";
      // }else if(result[i].status_pendaftaran == "Pending"){
      //   tombolapprove =   `<button onClick="" class="btn btn-info btn-block">Approve</button>`;
      //   tombolreject = `<button onClick="rejectDaftar()" class="btn btn-danger btn-block">Reject</button>`;
      //   tombolpending = "-";
      // } else{
      //   tombolapprove =   `<button onClick="" class="btn btn-info btn-block">Approve</button>`;
      //   tombolreject = `<button onClick="rejectDaftar()" class="btn btn-danger btn-block">Reject</button>`;
      //   tombolpending = `<button onClick="pendingDaftar()" class="btn btn-warning btn-block">Pending</button>`;
      // }

      if (result[i].status_pendaftaran == "AKTIF") {
        status = `<button onClick="" class="btn btn-success btn-block">${result[i].status_pendaftaran}</button>`;
      } else if (result[i].status_pendaftaran == "LULUS") {
        status = `<div class="btn-group"><button onClick="" class="btn btn-info">${result[i].status_pendaftaran}</button>
        <button onClick="ModalShowKemandirian()" class="btn btn-default">Kemandirian</button></div>`;
      } else if (result[i].status_pendaftaran == "OUTSTANDING") {
        status = `<button onClick="" class="btn btn-danger btn-block">${result[i].status_pendaftaran}</button>`;
      } else {
        status = `<button onClick="" class="btn btn-warning btn-block">${result[i].status_pendaftaran}</button>`;
      }
      data.push([
        dokumen,
        result[i].no_resistrasi, result[i].nik, result[i].nama_lengkap, result[i].asal_daerah, result[i].tempat_lahir,
        result[i].tanggal_lahir, result[i].umur, result[i].jenis_kelamin, result[i].pendidikan_terakhir, result[i].keterangan_tinggal, result[i].keterampilan, result[i].ekskul,
        result[i].nama_ayah, result[i].nama_ibu, result[i].keterangan_ortu, result[i].nama_nohp,
        result[i].nohp, result[i].tanggal_masuk, result[i].tanggal_keluar, result[i].nama_pembimbing, status,
        tombol

      ]);
    }

    //overlayDataWarga();

    $('#example1').DataTable({
      data: data,
      // scroller:       true,
      // scrollCollapse: true,
      // deferRender:    true,
      // scrollY:        500
    });
  });
}

function getStatusClient2() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_status_clients";
  var status = document.getElementById("status");
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      statusClient = JSON.parse(this.responseText);
      for (var i = 0; i < statusClient.length; i++) {
        var option = `
                    <option value="${statusClient[i].id}">${statusClient[i].nama}</option>
                    `
        status.innerHTML += option
      }

    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}

function showDokumen() {
  let noregis;
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);

      let xhr = new XMLHttpRequest();
      let url = "http://" + server + "/get_file";
      xhr.responseType = "blob";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var blob = new Blob([(xhr.response)], {
            type: 'application/pdf'
          });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob); // for IE
          } else {
            var fileURL = URL.createObjectURL(blob);
            var newWin = window.open(fileURL);
            newWin.focus();
          }
        }
      };
      var data = JSON.stringify({
        "no_registrasi": noregis
      });
      // Sending data with the request
      xhr.send(data);
    }
  }


}

function uploadDokumen() {
  let noregis;
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      localStorage.setItem("noregis-file", noregis)
      getListPembimbing2();
      getStatusClient2();
      ModalShow();
    }
  }
  ModalShow();
}

function prosesUploadDokumen() {
  const inpFile = document.getElementById("inpFile");

  const xhr = new XMLHttpRequest();
  const url = "http://" + server + "/upload_file";
  const formData = new FormData();
  for (const file of inpFile.files) {
    formData.append(localStorage.getItem("noregis-file"), file);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText);
        console.log(status);
        for (var i = 0; i < status.length; i++) {


        }
      } else {

      }
    };
  }
  xhr.open("POST", url, true);
  xhr.send(formData);


}

function getKeterampilan() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_keterampilan";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueKeterampilan()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueKeterampilan() {
  var select = document.getElementById('keterampilan')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function getEkstrakulikuler() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_ekskul";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueEkstrakulikuler()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueEkstrakulikuler() {
  var select = document.getElementById('eskul')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function getPendidikan() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_pendidikan";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valuePendidikan()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valuePendidikan() {
  var select = document.getElementById('pendidikan')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function getTinggal() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_keterangan_tinggal";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueTinggal()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueTinggal() {
  var select = document.getElementById('tinggal')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function getOrtu() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_keterangan_ortu";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueOrtu()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueOrtu() {
  var select = document.getElementById('ortu')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function getStatusClient() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_status_clients";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      valueStatusClient()
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  // Sending data with the request
  xhr.send(data);

}

function valueStatusClient() {
  var select = document.getElementById('status')
  for (var i = 0; i < result.length; i++) {
    var option = `
                <option value="${result[i].nama}">${result[i].nama}</option>
                `
    select.innerHTML += option
  }
}

function ModalNone() {
  var modal = document.getElementById("modal-default");
  modal.style.display = "none";
}

function ModalShow() {
  var modal = document.getElementById("modal-default");
  var Parent = document.getElementById('modal-body');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";


}

function ModalNoneKemandirian() {
  var modal = document.getElementById("modal-default-kemandirian");
  modal.style.display = "none";
}

function ModalShowKemandirian() {
  var modal = document.getElementById("modal-default-kemandirian");
  var Parent = document.getElementById('modal-body-kemandirian');
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  modal.style.display = "block";


}

function ModalNoneEdit() {
  var modal = document.getElementById("modal-default-edit");
  modal.style.display = "none";
}

function ModalCloseEdit() {
  window.location = "daftar-client"
}

function ModalShowEdit() {
  var modal = document.getElementById("modal-default-edit");
  // var Parent = document.getElementById('modal-body-edit');
  // while (Parent.hasChildNodes()) {
  //   Parent.removeChild(Parent.firstChild);
  // }
  modal.style.display = "block";


  let noregis;
  if (!document.getElementsByTagName || !document.createTextNode) return;
  var rows = document.getElementById('tbpendafaran').getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      getPendidikan();
      noregis = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(1).innerHTML);
      nik = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(2).innerHTML);
      nama = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(3).innerHTML);
      asal = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(4).innerHTML);
      tempatlahir = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(5).innerHTML);
      umur = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(7).innerHTML);
      kontak = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(16).innerHTML);
      nohp = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(17).innerHTML);
      jk = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(8).innerHTML);
      pendidikan = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(9).innerHTML);
      tinggal = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(10).innerHTML);
      keterampilan = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(11).innerHTML);
      eskul = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(12).innerHTML);
      ayah = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(13).innerHTML);
      ibu = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(14).innerHTML);
      lahir = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(6).innerHTML);
      ortu = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(15).innerHTML);
      pendaftaran = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(21).innerHTML);
      masuk = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(18).innerHTML);
      keluar = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(19).innerHTML);
      pembimbing = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(20).innerHTML);
      status = (document.getElementById("tbpendafaran").rows[this.rowIndex - 1].cells.item(21).textContent);
      var noreg = document.getElementById("noreg");
      var nik_ = document.getElementById("nik");
      var nama_ = document.getElementById("nama");
      var asal_ = document.getElementById("asal_daerah");
      var tempatlahir_ = document.getElementById("tempatlahir");
      var umur_ = document.getElementById("umur");
      var nohp_ = document.getElementById("notelpon");
      var jk_ = document.getElementById("jk");
      var kontak_ = document.getElementById("kontak");
      var pendidikan_ = document.getElementById("pendidikan");
      var tinggal_ = document.getElementById("tinggal");
      var keterampilan_ = document.getElementById("keterampilan");
      var eskul_ = document.getElementById("eskul");
      var ayah_ = document.getElementById("ayah");
      var ibu_ = document.getElementById("ibu");
      var lahir_ = document.getElementById("ttl");
      var ortu_ = document.getElementById("ttl");
      var masuk_ = document.getElementById("masuk");
      var keluar_ = document.getElementById("keluar");
      var pembimbing_ = document.getElementById("pembimbing");
      var status_ = document.getElementById("status");
      noreg.value += noregis
      nik_.value += nik
      nama_.value += nama
      asal_.value += asal
      tempatlahir_.value += tempatlahir
      umur_.value += umur
      nohp_.value += nohp
      jk_.value += jk
      kontak_.value += kontak
      pendidikan_.innerHTML += `<option value="${pendidikan}" selected="">${pendidikan}</option>`
      tinggal_.innerHTML += `<option value="${tinggal}" selected="">${tinggal}</option>`
      keterampilan_.innerHTML += `<option value="${keterampilan}" selected="">${keterampilan}</option>`
      eskul_.innerHTML += `<option value="${eskul}" selected="">${eskul}</option>`
      ayah_.value += ayah
      ibu_.value += ibu
      lahir_.value = lahir.split("-").reverse().join("-")

      ortu_.innerHTML += `<option value="${ortu}" selected="">${ortu}</option>`
      masuk_.value = masuk.split("-").reverse().join("-")
      keluar_.value = keluar.split("-").reverse().join("-")
      console.log(status);
      pembimbing_.innerHTML += `<option value="${pembimbing}" selected="">${pembimbing}</option>`
      status_.innerHTML += `<option value="${status}" selected="">${status}</option>`

      getEkstrakulikuler();
      getKeterampilan();
      getTinggal();
      getOrtu();
      getListPembimbing2();
      getStatusClient();

    }
  }


}

function updateDataClient() {
  var noreg_ = document.getElementById("noreg").value;;
  var nik_ = document.getElementById("nik").value;;
  var nama_ = document.getElementById("nama").value;;
  var asal_ = document.getElementById("asal_daerah").value;;
  var tempatlahir_ = document.getElementById("tempatlahir").value;;
  var umur_ = document.getElementById("umur").value;;
  var nohp_ = document.getElementById("notelpon").value;;
  var jk_ = document.getElementById("jk").value;;
  var kontak_ = document.getElementById("kontak").value;;
  var pendidikan_ = document.getElementById("pendidikan").value;;
  var tinggal_ = document.getElementById("tinggal").value;;
  var keterampilan_ = document.getElementById("keterampilan").value;;
  var eskul_ = document.getElementById("eskul").value;;
  var ayah_ = document.getElementById("ayah").value;;
  var ibu_ = document.getElementById("ibu").value;;
  var lahir_ = document.getElementById("ttl").value;;
  var ortu_ = document.getElementById("ortu").value;;
  var masuk_ = document.getElementById("masuk").value;;
  var keluar_ = document.getElementById("keluar").value;;
  var pembimbing_ = document.getElementById("pembimbing").value;;
  var status_ = document.getElementById("status").value;

  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/update_verified_clients";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      for (var i = 0; i < result.length; i++) {
        if (result[i].STATUS == "BERHASIL") {
          alert("UPDATE DATA UNTUK NO REGIS " + result[i].PESAN.no_registrasi + " BERHASIL");
          window.location = "daftar-client";
        } else {
          alert(result[i].STATUS + "-" + result[i].PESAN);
          window.location = "daftar-client";
        }
      }

    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username"),
    "no_registrasi": noreg_,
    "nik": nik_,
    "nama_lengkap": nama_,
    "asal_daerah": asal_,
    "tempat_lahir": tempatlahir_,
    "tanggal_lahir": lahir_.replace(/-/g, ""),
    "jenis_kelamin": jk_,
    "pendidikan_terakhir": pendidikan_,
    "keterangan_tinggal": tinggal_,
    "keterampilan": keterampilan_,
    "ekskul": eskul_,
    "nama_ayah": ayah_,
    "nama_ibu": ibu_,
    "keterangan_ortu": ortu_,
    "umur": umur_,
    "nama_nohp": kontak_,
    "nohp": nohp_,
    "status_client": status_,
    "tanggal_masuk": masuk_.replace(/-/g, ""),
    "tanggal_keluar": keluar_.replace(/-/g, ""),
    "nama_pembimbing": pembimbing_
  });

  var data2 = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username"),
    "no_registrasi": noreg_,
    "nik": nik_,
    "nama_lengkap": nama_,
    "asal_daerah": asal_,
    "tempat_lahir": tempatlahir_,
    "tanggal_lahir": lahir_.replace(/-/g, ""),
    "jenis_kelamin": jk_,
    "pendidikan_terakhir": pendidikan_,
    "keterangan_tinggal": tinggal_,
    "keterampilan": keterampilan_,
    "ekskul": eskul_,
    "nama_ayah": ayah_,
    "nama_ibu": ibu_,
    "keterangan_ortu": ortu_,
    "umur": umur_,
    "nama_nohp": kontak_,
    "nohp": nohp_,
    "status_client": status_,
    "tanggal_masuk": masuk_.replace(/-/g, ""),
    "tanggal_keluar": "",
    "nama_pembimbing": pembimbing_
  });
  // Sending data with the request
  if (keluar_.value == "-") {
    xhr.send(data2);
    console.log(data2);
  } else {
    xhr.send(data);
    console.log(data);

  }
}

function getDashboard() {
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/get_dashboard";
  let aktif = document.getElementById("aktif");
  let lulus = document.getElementById("lulus");
  let outstanding = document.getElementById("outstanding");
  let rujuk = document.getElementById("rujuk");
  let baru = document.getElementById("baru");
  let approved = document.getElementById("approved");
  let rejected = document.getElementById("rejected");
  let pending = document.getElementById("pending");

  let divolahpangan = document.getElementById("bar-olahpangan");
  let divbarbershop = document.getElementById("bar-barbershop");
  let divbarista = document.getElementById("bar-barista");
  let divmenjahit = document.getElementById("bar-menjahit");
  let divmontir = document.getElementById("bar-montir");
  let divsablon = document.getElementById("bar-sablon");
  let divhandycraft = document.getElementById("bar-handycraft");
  let divmassage = document.getElementById("bar-massage");
  let divfarming = document.getElementById("bar-farming");

  let spanolahpangan = document.getElementById("span-olahpangan");
  let spanbarbershop = document.getElementById("span-barbershop");
  let spanbarista = document.getElementById("span-barista");
  let spanmenjahit = document.getElementById("span-menjahit");
  let spanmontir = document.getElementById("span-montir");
  let spansablon = document.getElementById("span-sablon");
  let spanhandycraft = document.getElementById("span-handycraft");
  let spanmassage = document.getElementById("span-massage");
  let spanfarming = document.getElementById("span-farming");

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      for (var i = 0; i < result.length; i++) {
        aktif.innerHTML += result[i].JML_AKTIF;
        lulus.innerHTML += result[i].JML_LULUS;
        outstanding.innerHTML += result[i].JML_OUTSTANDING;
        rujuk.innerHTML += result[i].JML_RUJUK;
        baru.innerHTML += result[i].JML_PENDAFTAR_BARU;
        approved.innerHTML += result[i].JML_APPROVED;
        rejected.innerHTML += result[i].JML_REJECTED;
        pending.innerHTML += result[i].JML_PENDING;
        var barolahpangan = result[i].JML_KETERAMPILAN_TATA_BOGA / result[i].JML_AKTIF * 100
        var barbarbershop = result[i].JML_KETERAMPILAN_BARBERSHOP / result[i].JML_AKTIF * 100
        var barbarista = result[i].JML_KETERAMPILAN_BARISTA / result[i].JML_AKTIF * 100
        var barmontir = result[i].JML_KETERAMPILAN_MONTIR_MOTOR / result[i].JML_AKTIF * 100
        var barmenjahit = result[i].JML_KETERAMPILAN_MENJAHIT_KONVEKSI / result[i].JML_AKTIF * 100
        var barsablon = result[i].JML_EKSKUL_SABLON / result[i].JML_AKTIF * 100
        var barhandycraft = result[i].JML_EKSKUL_HANDYCRAFT / result[i].JML_AKTIF * 100
        var barmassage = result[i].JML_EKSKUL_MASSAGE / result[i].JML_AKTIF * 100
        var barfarming = result[i].JML_EKSKUL_FARMING / result[i].JML_AKTIF * 100

        var div1 = `<div class="progress-bar progress-bar-danger" style="width: ${barolahpangan}%"></div>`
        var div2 = `<div class="progress-bar progress-bar-danger" style="width: ${barbarbershop}%"></div>`
        var div3 = `<div class="progress-bar progress-bar-danger" style="width: ${barbarista}%"></div>`
        var div4 = `<div class="progress-bar progress-bar-danger" style="width: ${barmenjahit}%"></div>`
        var div5 = `<div class="progress-bar progress-bar-danger" style="width: ${barmontir}%"></div>`

        var biv1 = `<div class="progress-bar progress-bar-warning" style="width: ${barsablon}%"></div>`
        var biv2 = `<div class="progress-bar progress-bar-warning" style="width: ${barhandycraft}%"></div>`
        var biv3 = `<div class="progress-bar progress-bar-warning" style="width: ${barmassage}%"></div>`
        var biv4 = `<div class="progress-bar progress-bar-warning" style="width: ${barfarming}%"></div>`

        divolahpangan.innerHTML += div1
        divbarbershop.innerHTML += div2
        divbarista.innerHTML += div3
        divmenjahit.innerHTML += div4
        divmontir.innerHTML += div5

        divsablon.innerHTML += biv1
        divhandycraft.innerHTML += biv2
        divmassage.innerHTML += biv3
        divfarming.innerHTML += biv4

        spanbarbershop.innerHTML = `${result[i].JML_KETERAMPILAN_BARBERSHOP} / ${result[i].JML_AKTIF} `
        spanbarista.innerHTML = `${result[i].JML_KETERAMPILAN_BARISTA} / ${result[i].JML_AKTIF} `
        spanmenjahit.innerHTML = `${result[i].JML_KETERAMPILAN_MENJAHIT_KONVEKSI} / ${result[i].JML_AKTIF} `
        spanmontir.innerHTML = `${result[i].JML_KETERAMPILAN_MONTIR_MOTOR} / ${result[i].JML_AKTIF} `
        spanolahpangan.innerHTML = `${result[i].JML_KETERAMPILAN_TATA_BOGA} / ${result[i].JML_AKTIF} `

        spansablon.innerHTML = `${result[i].JML_EKSKUL_SABLON} / ${result[i].JML_AKTIF} `
        spanhandycraft.innerHTML = `${result[i].JML_EKSKUL_HANDYCRAFT} / ${result[i].JML_AKTIF} `
        spanmassage.innerHTML = `${result[i].JML_EKSKUL_MASSAGE} / ${result[i].JML_AKTIF} `
        spanfarming.innerHTML = `${result[i].JML_EKSKUL_FARMING} / ${result[i].JML_AKTIF} `
      }

    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);
}


function valueBaru() {
  localStorage.setItem("jenisfilter", "get_pendaftar_baru");
  localStorage.setItem("header", "DATA PENDAFTAR BARU");
  window.location = 'more-info.html'
}

function valueApproved() {
  localStorage.setItem("jenisfilter", "get_pendaftar_approved");
  localStorage.setItem("header", "DATA PENDAFTAR APPROVED");
  window.location = 'more-info.html'
}

function valueRejected() {
  localStorage.setItem("jenisfilter", "get_pendaftar_rejected");
  localStorage.setItem("header", "DATA PENDAFTAR REJECTED");
  window.location = 'more-info.html'
}

function valuePending() {
  localStorage.setItem("jenisfilter", "get_pendaftar_pending");
  localStorage.setItem("header", "DATA PENDAFTAR PENDING");
  window.location = 'more-info.html'
}

function valueAktif() {
  localStorage.setItem("jenisfilter", "get_client_aktif");
  localStorage.setItem("header", "DATA CLIENT AKTIF");
  window.location = 'more-info2.html'
}

function valueLulus() {
  localStorage.setItem("jenisfilter", "get_client_lulus");
  localStorage.setItem("header", "DATA CLIENT LULUS");
  window.location = 'more-info2.html'
}

function valueOutstanding() {
  localStorage.setItem("jenisfilter", "get_client_outstanding");
  localStorage.setItem("header", "DATA CLIENT OUTSTANDING");
  window.location = 'more-info2.html'
}

function valueRujuk() {
  localStorage.setItem("jenisfilter", "get_client_rujuk");
  localStorage.setItem("header", "DATA CLIENT RUJUK");
  window.location = 'more-info2.html'
}

function moreInfo1() {
  let headerData = localStorage.getItem("header");
  let header = document.getElementById("headerinfo");
  header.innerHTML += headerData;
  let filterData = localStorage.getItem("jenisfilter");
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/" + filterData;

  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      console.log(result);
      buildDaftarPendaftaran();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);


}

function moreInfo2() {
  let headerData = localStorage.getItem("header");
  let header = document.getElementById("headerinfo");
  header.innerHTML += headerData;
  let filterData = localStorage.getItem("jenisfilter");
  let xhr = new XMLHttpRequest();
  let url = "http://" + server + "/" + filterData;

  xhr.open("post", url, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(this.responseText);
      console.log(result);
      buildDaftarClients();
    }
  };
  var data = JSON.stringify({
    "token": localStorage.getItem("token"),
    "username": localStorage.getItem("username")
  });
  xhr.send(data);


}

function validation() {
  if (localStorage.getItem("token") == null) {
    alert("Sesi Login Anda Sudah Berakhir, silahkan login ulang");
    window.location = "index";
  }
}
