/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */

$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
      getData();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $('.add').on('click', handleAddClicked);
      $('.cancel').on('click', handleCancelClick);
      $('.getData').on('click', getData);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
      addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
      var studentInfo = {
            name: $('#studentName').val(),
            course: $('#course').val(),
            grade: $('#studentGrade').val()
      }
      if(studentInfo.name !== '' && studentInfo.course !== '' && studentInfo.grade !== '' && parseFloat(studentInfo.grade) >= 0 && parseFloat(studentInfo.grade) <= 100) {
            // $('.add').prop('disabled', false);
            student_array.push(studentInfo);
            clearAddStudentFormInputs();
            updateStudentList(student_array);
      }
      
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $('input').val('');
      console.log('cleared');
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
      var newRow = $('<tr>', {
            class: 'student-table-row'
      })
      var displayName = $('<td>',{
            text: studentObj.name,
            'class': 'col-xs-3 '
      })
      var displayCourse = $('<td>',{
            text: studentObj.course,
            'class': 'col-xs-3'
      })
      var displayGrade = $('<td>',{
            text: studentObj.grade,
            'class': 'col-xs-'
      })
      var deleteButton = $('<td>').addClass('col-xs-3').append($('<button>',{
            text: 'Delete',
            class: 'btn btn-danger',
            click: function(){
                  debugger;
                  removeStudent(studentObj);
            }
             
      }))
      newRow.append(displayName, displayCourse, displayGrade, deleteButton);
      $('tbody').append(newRow);

}

function removeStudent(studentObj){
      debugger;
      var studentIndex = student_array.indexOf(studentObj);
      student_array.splice(studentIndex, 1);
      $('.student-table-row').remove();
      updateStudentList(student_array);
      console.log(student_array);
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(arrayOfStudents){
      $('.student-table-row').remove();
      for(studentIndex = 0; studentIndex < arrayOfStudents.length; studentIndex++){
            renderStudentOnDom(arrayOfStudents[studentIndex]);
      }
      calculateGradeAverage();
      renderGradeAverage();
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
      var sum = 0
      for(studentIndex = 0; studentIndex < student_array.length; studentIndex++){
            sum += parseInt(student_array[studentIndex].grade);
      }
      var average = sum/student_array.length;
      return average;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(){
      var result = calculateGradeAverage();
      console.log(result);
      if(isNaN(result)){
            $('.avgGrade').text('0');
      }else{
            $('.avgGrade').text(calculateGradeAverage);
      }
}

function getData(){
      var studentDataBase = {
            url: "https://s-apis.learningfuze.com/sgt/get",
            dataType: 'json',
            method: 'post',
            success: function(response){
                 var studentData =  response.data;
                 student_array = studentData;
                 updateStudentList(student_array);
                 console.log(response);
            },
            data: {
                  api_key: 'E0aooQZMEC'
            }
      }
      $.ajax(studentDataBase);
}


