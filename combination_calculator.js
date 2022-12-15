//the first group would be the first group of output,
//pick any number from first group => remain number for next group
//in next group, pick any number and divide the total of that group, and multiply the remian number,
//can get the next group of output,
//then pick any number from second output group, would be another remain number for next group,

//continue this process
//can get such outputs

//from outputs, get out the results where the max should be in the range

//New condtions added
// 1. upper input with group name
// 2. lower input with group name
// and the remain numbers should be lower with these numbers.

let outPut = [];
let groupArray = [];
let groupNames = [];
let initialSum = 0;
let Condition1 = 0;
let Condition2 = 0;
let Condition3 = 0;
let currentLimit = 0;
const columnName = ["A", "B", "C"];

let min = document.getElementById("l-limit").value || 0;
let max = document.getElementById("u-limit").value || 0;

function displayGroups() {
  const storedArr = localStorage.getItem("groupArray");
  const storedNames = localStorage.getItem("groupNames");
  groupArray = [];
  groupNames = [];
  groupArray.push(...JSON.parse(storedArr));
  groupNames.push(...JSON.parse(storedNames));

  if (groupArray.length) {
    let index = 0;
    const tbodyElement = document.getElementById("groups");
    tbodyElement.innerHTML = "";
    groupArray.map((eachGroup) => {
      index = index + 1;
      const newGroupText =
        "<tr><td>" +
        groupNames[index - 1] +
        "</td><td>" +
        eachGroup[0] +
        "</td><td>" +
        eachGroup[1] +
        "</td><td>" +
        eachGroup[2] +
        '</td><td class="quan-w3"><div><button onclick="setValues(' +
        index +
        ')" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fas fa-pen"></i></button><button onclick="setIndex(' +
        index +
        ')" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteConfirm"><i class="fas fa-trash"></i></button></div></td></tr>';
      const initHTML = tbodyElement.innerHTML;
      tbodyElement.innerHTML = initHTML + newGroupText;
    });

    //Reset name options to select element 1 and 2
    const selectEle1 = document.getElementById("sel1");
    const selectEle2 = document.getElementById("sel2");
    const changedOptions = groupNames.map((eachName, i) => {
      return `<option>${eachName}</option>`;
    });

    selectEle1.innerHTML = changedOptions.toString().replace(/,/g, "");
    selectEle2.innerHTML = changedOptions.toString().replace(/,/g, "");
  } else document.getElementById("groups").innerHTML = "";
}

function displayOutPut() {
  const resultTbody = document.getElementById("output");
  resultTbody.innerHTML = "";

  if (!outPut.length) {
    if (min > 0 && max > 0)
      resultTbody.innerHTML = "<h3>Sorry, there's no tickets...</h3>";
    else resultTbody.innerHTML = "<h3>Please the filters exactly...</h3>";

    const numOfComb = document.getElementById("numOfComb");
    numOfComb.innerHTML = "";
  } else {
    let index = 0;
    let cardComponent = "";
    const numOfComb = document.getElementById("numOfComb");
    numOfComb.innerHTML = "<h3> Number Of Tickets: " + outPut.length + "</h3>";
    for (
      let index = currentLimit * 30;
      index < (currentLimit + 1) * 30;
      index++
    ) {
      const eachOutPut = outPut[index];
      if (eachOutPut)
        cardComponent =
          cardComponent +
          `<div class="card">
            <h3>Ticket ${index + 1}</h3>
            <table class="table table-hover table-bordered result-table">
                <thead>
                    <tr class='table-primary'>
                        <th>Matches</th>
                        <th>HOME</th>
                        <th>DRAW</th>
                        <th>AWAY</th>
                        <th>UNITS</th>
                    </tr>
                </thead>
                <tbody>
                    ${eachOutPut.map((eachArr, i) => {
                      const clone = eachArr.slice(0, -2);
                      return `<tr>
                            <td>${groupNames[i]}</td>
                            ${clone.map((item, key) => {
                              if (key === eachArr[4])
                                return `<td class='quan-text-bold quan-bg-pink'>${item}</td>`;
                              else return `<td>${item}</td>`;
                            })}
                            <td>${eachArr[3] ? eachArr[3] : ""}</td>
                        </tr>`;
                    })}
                </tbody>
            </table>
            </div>`;
    }

    cardComponent = cardComponent.toString().replace(/,/g, "");

    resultTbody.innerHTML = resultTbody.innerHTML + cardComponent;
  }

  return true;
}

const displayLoading = () => {
  console.log("HI");
  const resultTbody = document.getElementById("output");
  resultTbody.innerHTML = "<div class='quan-loader'></div>";
};

function setValues(index) {
  document.getElementById("editGroupName").value = groupNames[index - 1];
  document.getElementById("editNum1").value = groupArray[index - 1][0];
  document.getElementById("editNum2").value = groupArray[index - 1][1];
  document.getElementById("editNum3").value = groupArray[index - 1][2];
  document.getElementById("hiddenIndex").value = index;
}

function editGroup() {
  const index = document.getElementById("hiddenIndex").value;
  const name = document.getElementById("editGroupName").value.trim();
  const num1 = document.getElementById("editNum1").value;
  const num2 = document.getElementById("editNum2").value;
  const num3 = document.getElementById("editNum3").value;

  const storedArr = localStorage.getItem("groupArray");
  const storedNames = localStorage.getItem("groupNames");
  groupArray = [];
  groupNames = [];
  groupArray.push(...JSON.parse(storedArr));
  groupNames.push(...JSON.parse(storedNames));

  groupNames[index - 1] = name;
  groupArray[index - 1][0] = num1;
  groupArray[index - 1][1] = num2;
  groupArray[index - 1][2] = num3;

  localStorage.setItem("groupArray", JSON.stringify(groupArray));
  localStorage.setItem("groupNames", JSON.stringify(groupNames));

  displayGroups();
}

function addGroups() {
  let newGroup = [];
  const num1 = document.getElementById("addNum1").value;
  const num2 = document.getElementById("addNum2").value;
  const num3 = document.getElementById("addNum3").value;
  const groupName = document.getElementById("addGroupName").value.trim();
  if (num1 && num2 && num3) {
    newGroup.push(num1);
    newGroup.push(num2);
    newGroup.push(num3);
    groupArray.push(newGroup);
    groupNames.push(groupName);
  }
  localStorage.setItem("groupArray", JSON.stringify(groupArray));
  localStorage.setItem("groupNames", JSON.stringify(groupNames));
  displayGroups();
}

function deleteGroup() {
  const storedArr = localStorage.getItem("groupArray");
  const storedNames = localStorage.getItem("groupNames");
  groupArray = [];
  groupNames = [];
  groupArray.push(...JSON.parse(storedArr));
  groupNames.push(...JSON.parse(storedNames));

  const index = document.getElementById("deleteIndex").value;
  groupNames.splice(index - 1, 1);
  groupArray.splice(index - 1, 1);

  localStorage.setItem("groupArray", JSON.stringify(groupArray));
  localStorage.setItem("groupNames", JSON.stringify(groupNames));

  displayGroups();
}

function setIndex(index) {
  document.getElementById("deleteIndex").value = index;
}

function countPlaces(num) {
  var text = num.toString();
  var index = text.indexOf(".");
  return index == -1 ? 0 : text.length - index - 1;
}

const calc = (depth, remain, items) => {
  let newArr = [];
  if (groupArray.length < depth + 1) {
    const lastArr = items[items.length - 1].slice(0, 3);
    if (Math.min(...lastArr) >= min && Math.max(...lastArr) <= max) {
      outPut.push(items);
    }
    return;
  }

  groupArray[depth].map((item) =>
    newArr.push(Math.round((item * remain * 100) / initialSum) / 100)
  );

  newArr.map((item, key) => {
    const clone = [...items];
    const remainObj = [item, key];
    clone.push([...newArr, ...remainObj]);
    calc(depth + 1, item, clone);
  });
};

const secondFilter = () => {
  const upperName = groupNames.indexOf(document.getElementById("sel1").value);
  const lowerName = groupNames.indexOf(document.getElementById("sel2").value);
  const upperGroupLimit = document.getElementById("u-group").value;
  const lowerGroupUpperLimit = document.getElementById("l-u-group").value;
  const lowerGroupLowerLimit = document.getElementById("l-l-group").value;

  // console.log("lower upper", lowerGroupLowerLimit, lowerGroupUpperLimit);

  const clone = [];
  outPut.map((eachOutPut, i) => {
    if (
      eachOutPut[upperName][3] <= upperGroupLimit &&
      eachOutPut[lowerName][3] >= lowerGroupLowerLimit &&
      eachOutPut[lowerName][3] <= lowerGroupUpperLimit
    ) {
      clone.push(eachOutPut);
    }
  });

  outPut = [];
  outPut.push(...clone);
  return true;
};

const removeDuplicatedElements = () => {
  let temp = [];
  let newOutPut = [];
  let eachClone = [];
  outPut.map((eachOut) => {
    eachClone = [];
    eachOut.map((item) => {
      eachClone.push(item.slice(0, 4));
    });
    temp.push(JSON.stringify(eachClone));
  });

  temp.map((item, index) => {
    if (temp.indexOf(item) == index) {
      newOutPut.push(outPut[index]);
    }
  });

  outPut = [];
  outPut.push(...newOutPut);
};

const getInputDataFromJSON = (jsonObj) => {
  groupArray = [];
  groupNames = [];
  jsonObj.map((eachGroupObj, i) => {
    groupNames.push(eachGroupObj.GroupName.trim());
    groupArray.push([
      Number(eachGroupObj.A.replace(/,/g, "")),
      Number(eachGroupObj.B.replace(/,/g, "")),
      Number(eachGroupObj.C.replace(/,/g, "")),
    ]);
  });

  localStorage.setItem("groupArray", JSON.stringify(groupArray));
  localStorage.setItem("groupNames", JSON.stringify(groupNames));
  displayGroups();
};

const ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        // console.log(JSON.parse(json_object));

        getInputDataFromJSON(JSON.parse(json_object));

        jQuery("#xlx_json").val(json_object);
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

function thirdFilter() {
  Condition1 = document.getElementById("con1").value || 0;
  Condition2 = document.getElementById("con2").value || 0;
  Condition3 = document.getElementById("con3").value || 0;
  let temp = [...outPut];
  outPut = [];
  temp.map((eachOutPut, k) => {
    const NumA = eachOutPut.filter((item) => item[4] == 0).length;
    const NumB = eachOutPut.filter((item) => item[4] == 1).length;
    const NumC = eachOutPut.filter((item) => item[4] == 2).length;
    if (NumA == Condition1 && NumB == Condition2 && NumC == Condition3)
      outPut.push(eachOutPut);
  });
}

function generate() {
  const resultTbody = document.getElementById("output");
  resultTbody.innerHTML = "<h3>Sorry, there's no tickets...</h3>";
  const numOfComb = document.getElementById("numOfComb");
  numOfComb.innerHTML = "";

  min = document.getElementById("l-limit").value || 0;
  max = document.getElementById("u-limit").value || 0;
  outPut = [];
  if (groupArray.length > 0) {
    initialSum = groupArray[0].reduce((total, num) => {
      //get sum for a group
      return total + Number(num);
    }, 0);
    if (max > 0) calc(0, initialSum, []);
  }
  if (document.getElementById("check").checked) secondFilter();
  if (document.getElementById("check_third").checked) thirdFilter();
  currentLimit = 0;
  if (outPut.length) displayOutPut();
}

const toPrev = () => {
  if (currentLimit > 0) currentLimit = currentLimit - 1;
  if (outPut.length) displayOutPut();
};

const toNext = () => {
  if (currentLimit < Math.ceil(outPut.length / 30) - 1)
    currentLimit = currentLimit + 1;
  if (outPut.length) displayOutPut();
};

const toPrevEnd = () => {
  currentLimit = 0;
  if (outPut.length) displayOutPut();
};

const toNextEnd = () => {
  currentLimit = Math.ceil(outPut.length / 30) - 1;
  console.log("currentLimit ", currentLimit);
  if (outPut.length) displayOutPut();
};
