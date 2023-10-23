import axios from "js/axios.cjs";
import JustValidate from "js/just-validate.production.min.js";

var direct_deposit_form = document.getElementById("direct_deposit");

const api="https://forms.pbasconnect.com"

if (direct_deposit_form !== null) {
  const validator = new JustValidate("#direct_deposit", {
    validateBeforeSubmitting: true,
  });

  validator
  .addField(document.querySelector("#sin"), [
    {
      rule: "required",
    },
    {
      rule: "customRegexp",
      value:
        /^\d{9}$/gm,
    },
  ])
  .addField(document.querySelector("#first_name"), [
    {
      rule: "required",
    },
  ])
  .addField(document.querySelector("#last_name"), [
    {
      rule: "required",
    },
  ])
  .addField(document.querySelector("#email"), [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ])
    .addField(document.querySelector("#institution_number"), [
      {
        rule: "required",
      },
      {
        rule: "customRegexp",
        value:
          /^\d{3}$/gm,
      },
    ])
    .addField(document.querySelector("#transit_number"), [
      {
        rule: "required",
      },
      {
        rule: "customRegexp",
        value:
          /^\d{5}$/gm,
      },
    ])
    .addField(document.querySelector("#account_number"), [
      {
        rule: "required",
      },
      {
        rule: "customRegexp",
        value:
          /^\d{7,12}$/gm,
      },
    ])
    .addField(document.querySelector("#verify_direct_deposit"), [
      {
        rule: "required",
      },
    ])
    
    .onSuccess((event) => {
      document.getElementById("success_msg").hidden=true
      document.getElementById("error_msg").hidden=true
      axios
        .post(api+"/api/direct_deposit_form", {
          sin: document.getElementById("sin").value,
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          email: document.getElementById("email").value,
          institution_number: document.getElementById("institution_number").value,
          transit_number: document.getElementById("transit_number").value,
          account_number: document.getElementById("account_number").value,
          verify_direct_deposit: document.getElementById("verify_direct_deposit").checked,
        })
        .then(function (response) {
          direct_deposit_form.parentElement.removeChild(direct_deposit_form)
          let successMsg = document.getElementById("success_msg");
          successMsg.hidden=false;
        })
        .catch(function (error) {
          // handle error
          let errorMsg = document.getElementById("error_msg");
          errorMsg.hidden=false;
        })
        .finally(function () {
          
        });
    });
}

var registration_form = document.getElementById("registration");

if (registration_form !== null) {
  const validator = new JustValidate("#registration", {
    validateBeforeSubmitting: true,
  });

  validator
    .addField(document.querySelector("#sin"), [
      {
        rule: "required",
      },
      {
        rule: "number",
      },
      {
        rule: "minLength",
        value: 9,
      },
      {
        rule: "maxLength",
        value: 9,
      },
    ])
    .addField(document.querySelector("#first_name"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#last_name"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#email"), [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ])
    .addField(document.querySelector("#date_of_birth"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#mailing_address"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#city"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#province"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#postal_code"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#phone"), [
      {
        rule: "required",
      },
      {
        rule: "customRegexp",
        value:
          /^\d{10}$/gm,
      },
    ])

    .addField(document.querySelector("#date_of_employment"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#employment_status"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#marital_status"), [
      {
        rule: "required",
      },
    ])
    .addField(document.querySelector("#verify"), [
      {
        rule: "required",
      },
    ])
    .onSuccess((event) => {
      document.getElementById("success_msg").hidden=true
      document.getElementById("error_msg").hidden=true
      let dependants = [];
      if (hasDependants) {
        for (let i = 0; i < dependantCount; i++) {
          dependants.push({
            first_name: document.getElementById(`d_first_name_${i}`).value,
            last_name: document.getElementById(`d_last_name_${i}`).value,
            relationship: document.getElementById(`d_relationship_${i}`).value,
            date_of_birth: document.getElementById(`d_dob_${i}`).value,
            sin: document.getElementById(`d_sin_${i}`).value,
            ins: document.getElementById(`d_ins_${i}`).value,
          });
        }
      }

      axios
        .post(api+"/api/registration_form", {
          sin: document.getElementById(
            "sin"
          ).value,
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          email: document.getElementById("email").value,
          date_of_birth: document.getElementById("date_of_birth").value,
          mailing_address: document.getElementById("mailing_address").value,
          city: document.getElementById("city").value,
          province: document.getElementById("province").value,
          postal_code: document.getElementById("postal_code").value,
          phone: document.getElementById("phone").value,
          date_of_employment:
            document.getElementById("date_of_employment").value,
          employment_status: document.getElementById("employment_status").value,
          marital_status: document.getElementById("marital_status").value,
          verify: document.getElementById("verify").value,
          dependants: dependants,
        })
        .then(function (response) {
          registration_form.parentElement.removeChild(registration_form)
          let successMsg = document.getElementById("success_msg");
          successMsg.hidden=false;
        })
        .catch(function (error) {
          // handle error
          let errorMsg = document.getElementById("error_msg");
          errorMsg.hidden=false;
        })
        .finally(function () {
          // always executed
        });
    });
}

// var dependant = document.getElementById("dependant");
var dContainer = document.getElementById("dependants");
var dependantsYes = document.getElementById("dependants_yes");
if (dependantsYes !== null) {
  dependantsYes.addEventListener("click", hasDependantsTrue);
}

var hasDependants = false;

function hasDependantsTrue(e) {
  // console.log("true", e, dContainer, dependantsYes.checked);
  if (hasDependants) {
    return;
  }
  dependantsNo.checked = false;
  dContainer.style = "visibility: visible";
  hasDependants = true;
  // addDependant();
}

var dependantsNo = document.getElementById("dependants_no");
if (dependantsNo !== null) {
  dependantsNo.checked = true;
}
if (dependantsNo !== null) {
  dependantsNo.addEventListener("click", hasDependantsFalse);
}

function hasDependantsFalse(e) {
  console.log("false", e);
  if (!hasDependants) {
    return;
  }
  dependantsYes.checked = false;
  dContainer.style = "visibility: hidden";
  hasDependants = false;
  for (let i = 0; i <= dependantCount; i++) {
    removeDependant();
  }
}

var dependantCount = 0;

var addDependantBtn = document.getElementById("add_dependant");
if (addDependantBtn !== null) {
  addDependantBtn.addEventListener("click", addDependant);
}
function addDependant() {
  console.log(dependantCount);
  // const clone = dependant.cloneNode(true);
  // clone.getElementById("d_title").innerHTML = `Dependant ${dependantCount + 1}`;
  let newItem = document.createElement("div");
  newItem.id = `dependant_${dependantCount}`;
  // newItem.className = "flex flex-wrap -mx-3 mb-6"
  let title = document.createElement("span");
  title.innerHTML = `Dependant ${dependantCount + 1}`;
  newItem.appendChild(title);
  let dependant = document.createElement("div");
  dependant.className = "flex flex-wrap -mx-3 mb-6";

  let fnDiv = document.createElement("div");
  fnDiv.className = "w-full md:w-1/2 px-3";
  let fnL = document.createElement("label");
  fnL.className =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
  fnL.htmlFor = `d_first_name_${dependantCount}`;
  fnL.innerHTML = "First Name";
  let fnI = document.createElement("input");
  fnI.className =
    "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  fnI.id = `d_first_name_${dependantCount}`;
  fnI.type = "text";
  fnDiv.appendChild(fnL);
  fnDiv.appendChild(fnI);

  let lnDiv = document.createElement("div");
  lnDiv.className = "w-full md:w-1/2 px-3";
  let lnL = document.createElement("label");
  lnL.className =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
  lnL.htmlFor = `d_last_name_${dependantCount}`;
  lnL.innerHTML = "Last Name";
  let lnI = document.createElement("input");
  lnI.className =
    "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  lnI.id = `d_last_name_${dependantCount}`;
  lnI.type = "text";
  lnDiv.appendChild(lnL);
  lnDiv.appendChild(lnI);

  let rDiv = document.createElement("div");
  rDiv.className = "w-full md:w-1/2 px-3";
  let rL = document.createElement("label");
  rL.className =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
  rL.htmlFor = `d_relationship_${dependantCount}`;
  rL.innerHTML = "Relationship";
  let rI = document.createElement("select");
  rI.className =
    "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  rI.id = `d_relationship_${dependantCount}`;
  let relationships = [
    "Spouse",
    "Child",
    "Child Under Guardianship",
    "Disabled Child",
  ];
  for (let i = 0; i < relationships.length; i++) {
    let option = document.createElement("option");
    option.value = relationships[i];
    option.text = relationships[i];
    rI.appendChild(option);
  }
  rDiv.appendChild(rL);
  rDiv.appendChild(rI);

  let dobDiv = document.createElement("div");
  dobDiv.className = "w-full md:w-1/2 px-3";
  let dobL = document.createElement("label");
  dobL.className =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
    dobL.htmlFor = `d_dob_${dependantCount}`;
    dobL.innerHTML = "Date of Birth";
  let dobI = document.createElement("input");
  dobI.className =
    "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
    dobI.id = `d_dob_${dependantCount}`;
    dobI.type = "date";
  dobDiv.appendChild(dobL);
  dobDiv.appendChild(dobI);

  let sinDiv = document.createElement("div");
  sinDiv.className = "w-full px-3";
  let sinL = document.createElement("label");
  sinL.className =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
    sinL.htmlFor = `d_sin_${dependantCount}`;
    sinL.innerHTML = "If your dependant has their own benefit plan, please provide us their SIN";
  let sinI = document.createElement("input");
  sinI.className =
    "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
    sinI.id = `d_sin_${dependantCount}`;
    sinI.type = "text";
    sinDiv.appendChild(sinL);
    sinDiv.appendChild(sinI);

    let insDiv = document.createElement("div");
    insDiv.className = "w-full px-3";
    let insL = document.createElement("label");
    insL.className =
      "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";
      insL.htmlFor = `d_ins_${dependantCount}`;
      insL.innerHTML = "and their Insurer";
    let insI = document.createElement("input");
    insI.className =
      "appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
      insI.id = `d_ins_${dependantCount}`;
      insI.type = "text";
      insDiv.appendChild(insL);
      insDiv.appendChild(insI);

  dependant.appendChild(fnDiv);
  dependant.appendChild(lnDiv);
  dependant.appendChild(rDiv);
  dependant.appendChild(dobDiv);
  dependant.appendChild(sinDiv);
  dependant.appendChild(insDiv);

  newItem.appendChild(dependant);
  dContainer.insertBefore(newItem, dContainer.children[dependantCount]);
  dependantCount++;

  removeDependantBtn.style = "visibility:visible";
}

var removeDependantBtn = document.getElementById("remove_dependant");
if (removeDependantBtn !== null) {
  removeDependantBtn.addEventListener("click", removeDependant);
}

function removeDependant() {
  let lastItem = document.getElementById(`dependant_${dependantCount - 1}`);
  lastItem.remove();
  dependantCount--;
  if (dependantCount === 0) {
    removeDependantBtn.style = "visibility: hidden";
  }
}

var contact_form = document.getElementById("contact");

if (contact_form !== null) {
  const validator = new JustValidate("#contact", {
    validateBeforeSubmitting: true,
  });

  validator
    .addField(document.querySelector("#first_name"), [
      {
        rule: "required",
      }
    ])
    .addField(document.querySelector("#last_name"), [
      {
        rule: "required",
      }
    ])
    .addField(document.querySelector("#email"), [
      {
        rule: "email",
      },
      {
        rule: "required",
      },

    ])
    .addField(document.querySelector("#phone_number"), [
      {
        rule: "customRegexp",
        value:
          /^\d{10}$/gm,
      },
    ])
    .addField(document.querySelector("#message"), [
      {
        rule: "required",
      },
    ])
    .onSuccess(() => {
      document.getElementById("success_msg").hidden=true
      document.getElementById("error_msg").hidden=true
      axios
        .post(api+"/api/contact_form", {
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          email: document.getElementById("email").value,
          phone_number: document.getElementById("phone_number").value,
          message: document.getElementById("message").value,
        })
        .then(function (response) {
          contact_form.parentElement.removeChild(contact_form)
          let successMsg = document.getElementById("success_msg");
          successMsg.hidden=false;
        })
        .catch(function (error) {
          // handle error
          let errorMsg = document.getElementById("error_msg");
          errorMsg.hidden=false;
        })
        .finally(function () {
          
        });
    });
}

var provider_contact_form = document.getElementById("provider_contact");
console.log(provider_contact_form);
if (provider_contact_form !== null) {
  const validator = new JustValidate("#provider_contact", {
    validateBeforeSubmitting: true,
  });

  validator
  .addField(document.querySelector("#first_name"), [
    {
      rule: "required",
    }
  ])
  .addField(document.querySelector("#last_name"), [
    {
      rule: "required",
    }
  ])
.addField(document.querySelector("#email"), [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
      {
        rule: "maxLength",
        value: 128,
      },
    ])
    .addField(document.querySelector("#provider"), [
      {
        rule: "maxLength",
        value: 255,
      },
    ])
    .addField(document.querySelector("#provider_phone"), [
      {
        rule: "customRegexp",
        value:
          /^\d{10}$/gm,
      },
    ])
    .addField(document.querySelector("#provider_email"), [
      {
        rule: "email",
      },
      {
        rule: "maxLength",
        value: 128,
      },
    ])
    .addField(document.querySelector("#provider_address"), [
      {
        rule: "maxLength",
        value: 255,
      },
    ])
    
    .onSuccess((event) => {
      document.getElementById("success_msg").hidden=true
      document.getElementById("error_msg").hidden=true
      axios
        .post(api+"/api/provider_contact_form", {
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          email: document.getElementById("email").value,
          provider: document.getElementById("provider").value,
          provider_phone: document.getElementById("provider_phone").value,
          provider_email: document.getElementById("provider_email").value,
          provider_address: document.getElementById("provider_address").value,
        })
        .then(function (response) {
          provider_contact_form.parentElement.removeChild(provider_contact_form)
          let successMsg = document.getElementById("success_msg");
          successMsg.hidden=false;
        })
        .catch(function (error) {
          // handle error
          let errorMsg = document.getElementById("error_msg");
          errorMsg.hidden=false;
        })
        .finally(function () {
          // always executed
        });
    });
}
