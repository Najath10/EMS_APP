package com.ems.s.Service;

import com.ems.s.Entity.Employee;
import com.ems.s.Exception.ResourceNotFoundException;
import com.ems.s.Repository.EmployeeRepository;
import com.ems.s.dto.EmployeeDto;
import com.ems.s.mapper.EmployeeMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    public EmployeeDto getEmployeeById(Long id) {
       Employee employee= employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists within given id"+id));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    public List<EmployeeDto> getAllEmployees(){
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(
                (employee) ->
                        EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }
    public EmployeeDto updateEmployee(Long id,EmployeeDto employeeDto){
       Employee employee = employeeRepository.findById(id).orElseThrow(
               ()->new ResourceNotFoundException("Employee is not exists within given id " + id));
       employee.setFirstName(employeeDto.getFirstName());
       employee.setLastName(employeeDto.getLastName());
       employee.setEmail(employeeDto.getEmail());
       employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    public void deleteEmployee(Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Employee is not exists within given id " + id));
        employeeRepository.deleteById(id);
    }
}
