var server = "192.168.5.16:8080";
function proses() {
  const result = document.getElementById("logupload");
  const inpFile = document.getElementById("inpFileAlfa");
  var tombolProses = document.getElementById("proses");
  // var tombolReset = document.getElementById("resetBukopinProses");
  tombolProses.disabled = true;
  // tombolReset.disabled = true;

  const xhr = new XMLHttpRequest();
  const url = "http://" + server + "/casemidi";
  const formData = new FormData();
  for (const file of inpFile.files) {
    formData.append("myFiles[]", file);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var status = JSON.parse(this.responseText);
        var table = document.getElementById('tbAlfa')
        for (var i = 0; i < status.length; i++) {
          tombolProses.disabled = false;
          // tombolReset.disabled = false;
            var row = `<tr align="Center">
                      <td>${status[i].tanggal}</td>
                      <td>${user[i].idel}</td>
                      <td>${user[i].screff}</td>
                      <td>${user[i].keterangan}</td>
                      </tr>`
            table.innerHTML += row
            //  deleteUser(i);
        }
      } else {
        tombolProses.disabled = false;
        // tombolReset.disabled = false;
      }
    };
  }
  xhr.open("POST", url, true);
  xhr.send(formData);

}
