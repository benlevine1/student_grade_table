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
      if(studentInfo.name !== '' && studentInfo.course !== '' && studentInfo.grade !== '' && parseInt(studentInfo.grade) >= 0 &&  parseInt(studentInfo.grade) <= 100) {
            student_array.push(studentInfo);
            clearAddStudentFormInputs();
            updateStudentList();
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
function renderStudentOnDom(){
      for(var studentIndex = 0; studentIndex < student_array.length; studentIndex++){
            var newRow = $('<tr>')
            var displayName = $('<td>',{
                  text: student_array[studentIndex].name,
                  'class': 'col-xs-3'
            })
            var displayCourse = $('<td>',{
                  text: student_array[studentIndex].course,
                  'class': 'col-xs-3'
            })
            var displayGrade = $('<td>',{
                  text: student_array[studentIndex].grade,
                  'class': 'col-xs-3'
            })
            var deleteButton = $('<td>').addClass('col-xs-3').append($('<button>',{
                  text: 'Delete',
                  'class': 'btn btn-danger' 
            }))
            newRow.append(displayName, displayCourse, displayGrade, deleteButton);
      }
      $('tbody').append(newRow);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(){
      renderStudentOnDom();
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
      $('.avgGrade').text(calculateGradeAverage);
}





