<?php

class Database {
    private $conn;
    private function getTypes($data) {
        $types = "";
        foreach ($data as $value) {
            if (is_int($value)) $types .= "i";
            elseif (is_double($value)) $types .= "d";
            else $types .= "s";
        }
        return $types;
    }

    public function connect($host, $user, $pass, $db) {
        $this->conn = new mysqli($host, $user, $pass, $db);
        return $this->conn;
    }

    public function insert($table, $data, $values = null) {
        if ($values !== null && is_array($data) && is_array($values)) {
            $columnsArr = $data;
            $valuesArr = $values;
        } elseif (is_array($data)) {
            $columnsArr = array_keys($data);
            $valuesArr = array_values($data);
        }

        $quoted = array_map(function($c) { return '`' . str_replace('`', '', $c) . '`'; }, $columnsArr);
        $columns = implode(", ", $quoted);
        $placeholders = implode(", ", array_fill(0, count($valuesArr), "?"));
        $sql = "INSERT INTO `$table` ($columns) VALUES ($placeholders)";

        $stmt = $this->conn->prepare($sql);
        $types = $this->getTypes($valuesArr);
        $stmt->bind_param($types, ...$valuesArr);
        return $stmt->execute();
    }

    public function select($table) {
        $result = $this->conn->query("SELECT * FROM $table");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function selectWhere($table, $column, $value) {
        $sql = "SELECT * FROM `$table` WHERE `$column` = ? LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $types = $this->getTypes([$value]);
        $stmt->bind_param($types, $value);
        $stmt->execute();
        $res = $stmt->get_result();
        $row = $res->fetch_assoc();
        $stmt->close();
        return $row;
    }

    public function update($table, $id, $data) {
        $set = implode(", ", array_map(fn($col) => "$col = ?", array_keys($data)));
        $stmt = $this->conn->prepare("UPDATE $table SET $set WHERE id = ?");
        $types = $this->getTypes($data) . "i";
        $values = array_values($data);
        $values[] = $id;
        $stmt->bind_param($types, ...$values);
        return $stmt->execute();
    }

    public function delete($table, $id) {
        $stmt = $this->conn->prepare("DELETE FROM $table WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}