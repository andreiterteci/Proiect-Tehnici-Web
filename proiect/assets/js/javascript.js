// Titlurile coloanelor
   var arrHead = new Array();
   arrHead = ['', 'Nume si prenume', 'Nota'];

   // Crearea tabelului
   function createTable() {
       var empTable = document.createElement('table');
       empTable.setAttribute('id', 'empTable');

       var tr = empTable.insertRow(-1);

       for (var h = 0; h < arrHead.length; h++) {
           var th = document.createElement('th');
           th.innerHTML = arrHead[h];
           tr.appendChild(th);
       }

       var div = document.getElementById('content');
       div.appendChild(empTable);
   }

   // Adaugarea unei noi linii
   function addRow() {
       var empTab = document.getElementById('empTable');

       var rowCnt = empTab.rows.length;
       var tr = empTab.insertRow(rowCnt);
       tr = empTab.insertRow(rowCnt);

       for (var c = 0; c < arrHead.length; c++) {
           var td = document.createElement('td');
           td = tr.insertCell(c);

           if (c == 0) {
               var button = document.createElement('input');

               button.setAttribute('type', 'button');
               button.setAttribute('value', 'Sterge');

               button.setAttribute('onclick', 'removeRow(this)');

               td.appendChild(button);
           }
           else {
               var element = document.createElement('input');
               element.setAttribute('type', 'text');
               element.setAttribute('value', '');

               td.appendChild(element);
           }
       }
   }

   // Stergerea unei linii
   function removeRow(oButton) {
       var empTab = document.getElementById('empTable');
       empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);
   }


// Mouse event


  function myFunction(e) {

    posX = event.clientX - window.innerWidth/3;

    img1.style.transform = "perspective(500px) scale("+posX*0.002+") " ;
    img2.style.transform = "perspective(500px) scale("+posX*0.002+") " ;
    img3.style.transform = "perspective(500px) scale("+posX*0.002+") " ;

  };




//AJAX


//Get users
 var url  = "http://localhost:3000/contact";
var xhr  = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onload = function () {
	var datas = JSON.parse(xhr.responseText);

	if (xhr.readyState == 3 && xhr.status == "200") {

   var info = new Array();
        info = datas;

        var news = document.getElementsByClassName("news-story")[0];

        for(var i = 0; i < info.length; i++) {
            var h5 = document.createElement("input");
            h5.setAttribute('value', info[i].id);
            h5.setAttribute('id', "id");
            var id = info[i].id;
            news.appendChild(h5);

            var p = document.createElement("input");
            p.setAttribute('value', info[i].nume);
            p.setAttribute('id', "nume");
            news.appendChild(p);

            var p = document.createElement("input");
            p.setAttribute('value', info[i].prenume);
            p.setAttribute('id', "prenume");
            news.appendChild(p);

            var p = document.createElement("input");
            p.setAttribute('value', info[i].email);
            p.setAttribute('id', "email");
            news.appendChild(p);

            var br = document.createElement("br");
            news.appendChild(br);


            var l = document.createElement("div");
            l.setAttribute('class', 'line');

            var button = document.createElement('input');

            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Sterge');

            button.setAttribute('onclick', 'deleteUser("id")');
            button.setAttribute('onclick', 'deleteUser("id")');

            news.appendChild(button);

            var button = document.createElement('input');

            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Upload');

            button.setAttribute('onclick', 'uploadUser("id")');
            button.setAttribute('onclick', 'uploadUser("id")');

            news.appendChild(button);



            news.appendChild(l);

        }

	} else {
		console.error(datas);
	}
}
xhr.send(null);


// Post a user
function inputData() {
  var data = {};

  data.nume  = document.getElementById("nume").value;
  data.prenume  = document.getElementById("prenume").value;
  data.email  = document.getElementById("email").value;
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
  	var users = xhr.responseText;
  	if (xhr.readyState == 3 && xhr.status == "201") {
  		console.table(users);
  	} else {
  		console.error(users);
  	}
  }
  xhr.send(json);
}

// Delete a user
function deleteUser(who){

  var xhr = new XMLHttpRequest();
  var who = document.getElementById('id').value;
  console.log(who);
  xhr.open("DELETE", url+"/"+who, true);
  xhr.onload = function () {
  	var users = JSON.parse(xhr.responseText);
  	if (xhr.readyState == 3 && xhr.status == "200") {
  		console.table(users);
  	} else {
  		console.error(users);
  	}
  }
  xhr.send(null);
}

// Update a user
function uploadUser(){
  var data = {};
  data.nume  = document.getElementById("nume").value;
  data.prenume  = document.getElementById("prenume").value;
  data.email  = document.getElementById("email").value;
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  var who = document.getElementById('id').value;

  xhr.open("PUT", url+'/'+who, true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
  	var users = JSON.parse(xhr.responseText);
  	if (xhr.readyState == 3 && xhr.status == "200") {
  		console.table(users);
  	} else {
  		console.error(users);
  	}
  }
  xhr.send(json);
}
