<?php

require_once('mysqlcredentials.php');

$student_id = intval($_POST['student_id']);

$query = "DELETE FROM `students` WHERE `id` = $student_id";

print($query);
?>