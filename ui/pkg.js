// import _ from './js/lodash'
// var lodash = _.noConflict()

function loadPackages() {
  $.ajax('/api/packages', {
    success: function(packages) {
      packages.forEach(function(d) {
        appendPackage(d)
      })
    }
  })
}
function appendPackage(Package) {
  $('#PackageList').append(createPackageLi(Package))
}
function createPackageLi(Package) {
  return $(`<li id="${Package.PKG_PKG_ID.trim()}">
    <span><a href="./PKGDetail.html?id=${Package.PKG_PKG_ID}">${Package.PKG_PKG_ID} / </a>${
    Package.PKG_CREATED_AT
  }</span>
    <input value="${Package.TXT_PKG_NAME}" disabled/>
    <span><button onclick="removePackage('${Package.PKG_PKG_ID}')">Remove PKG</button></span>
   </li>`)
}

function addPackage() {
  var $Packageidinput = $('#PkgidInput')
  var $PkgnameInput = $('#PkgnameInput')
  $.ajax('/api/packages', {
    method: 'POST',
    data: {
      PKG_ID: $Packageidinput.val(),
      PKG_NAME: $PkgnameInput.val()
    },
    success: function(package) {
      appendPackage(package)
      $Packageidinput.val('')
      $PkgnameInput.val('')
    }
  })
}
function removePackage(id) {
  $.ajax(`/api/pkgsiA/${id}`, {
    method: 'GET',
    success: function(Assignments) {
      var checkresult = _.size(Assignments)
      if (checkresult == 0) {
        $.ajax(`/api/packages/${id}`, {
          method: 'DELETE',
          success: function(resp) {
            removePackageLi(id)
          }
        })
      } else {
        alert("You can't delete it!")
      }
    },
    error: function() {
      alert("You can't delete it!")
    }
  })
}

// function removePackage(id) {
//   if (await checkDeletable(id)) {
//     $.ajax(`/api/packages/${id}`, {
//       method: 'DELETE',
//       success: function(resp) {
//         removePackageLi(id)
//       }
//     })
//   } else {
//     alert("You can't delete it!")
//   }
// }

function removePackageLi(packageId) {
  $(`#${packageId}`).remove()
}

loadPackages()
