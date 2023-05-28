-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2023 at 10:23 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` varchar(50) NOT NULL,
  `dept_name` varchar(50) DEFAULT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `emp_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`, `category_name`, `location`, `salary`, `emp_id`) VALUES
('5270570', 'ipangram', 'hr', 'indore', 55000, '5174330'),
('5934558', 'Google IT soln pvt name', 'hr', 'indore', 10000, '2692392');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` varchar(50) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `hobbies` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `firstname`, `lastname`, `email`, `password`, `gender`, `hobbies`) VALUES
('2692392', 'sanjeev', 'kushwaha', 'sanjeev123@gamil.com', '$2a$10$.YKDtgIw4YfIDas4m3zVveRmYvJHCs.0Y9PymKwu.RAoeR.OisPhe', 'male', 'cricket'),
('5174330', 'shubham', 'singh', 'shubhamsingh123@gmail.com', '$2a$10$zwMBCnAPZWeFm6bREbZaueN3ITsU1Xb0NlEWdh1eBpLMAosWkMDp2', 'male', 'football');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleid` varchar(50) NOT NULL,
  `rolename` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleid`, `rolename`) VALUES
('2646823', 'employee'),
('4411470', 'manager');

-- --------------------------------------------------------

--
-- Table structure for table `role_assign`
--

CREATE TABLE `role_assign` (
  `emp_id` varchar(50) DEFAULT NULL,
  `roleid` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_assign`
--

INSERT INTO `role_assign` (`emp_id`, `roleid`) VALUES
('2692392', '2646823'),
('5174330', '4411470'),
('2692392', '4411470');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleid`);

--
-- Indexes for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `roleid` (`roleid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);

--
-- Constraints for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD CONSTRAINT `role_assign_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`),
  ADD CONSTRAINT `role_assign_ibfk_2` FOREIGN KEY (`roleid`) REFERENCES `role` (`roleid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
