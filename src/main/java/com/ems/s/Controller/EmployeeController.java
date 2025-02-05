package com.ems.s.Controller;

import com.ems.s.Service.EmployeeService;
import com.ems.s.dto.EmployeeDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto employee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable long id){
        EmployeeDto employeeById = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeById);
    }

    @GetMapping
    public  ResponseEntity<?> getAllEmployee(){
        List<EmployeeDto> allEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(allEmployees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable  Long id,@RequestBody EmployeeDto employeeDto){
        EmployeeDto employee = employeeService.updateEmployee(id, employeeDto);
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("deleted Successfully");
    }

}
