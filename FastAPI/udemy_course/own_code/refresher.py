# assignment 1:
# welcome = 'Welcome to Python!'

# -=-=-=-=-=-

# assignment 2:

# money = 50
# purchase = 15
# print(money-purchase*1.03)

# -=-=-=-=-=-

# Assignment 3:

# name = 'engin'
# age = 20
# print('hello ' + name)
# print(f'Hello, my name is {name} and I am {age} years old')

# time_to_bd = int(input('How many days until birthday?'))
# print(f'There are approximately {time_to_bd//7} to your birthday')
# print(f'There are approximately {round(time_to_bd/7)} to your birthday')

# -=-=-=-=-=-
# Assignment 4

# my_list = [11, 23, 55, 33]
# my_list2 = ['eric', 'john', 'kelvin', 'aadil']
# print(my_list)
# print(my_list2[0])
# print(my_list2[-2])
# my_list2[-2] = 'alex'
# print(my_list2)
# print(len(my_list2))
# print(my_list[0:3])
# my_list.append(5525)
# print(my_list)
# my_list.insert(2, 3312312321)
# print(my_list)
# my_list.remove(23)
# print(my_list)
# my_list2.pop(3)

# my_set = {1,2,3,4,5,1,2} # sets cannot contain duplicates of same value, and they are unordered
# print(my_set) # only shows unique elements
# print(len(my_set)) # only counts unique elements

# print(my_set[0]) # gives error as sets are unordered

# my_set.discard(3) # will remove the element with val 3
# my_set.clear() # removes all element from the set
# my_set.add(6) # will add 6 to the set
# my_set.update([8, 9]) # adds multiple items to set

# my_tuple = (1, 2, 3, 4, 5)
# print(len(my_tuple)) # will return 5
# print(my_tuple[2]) # will print index 2
# my_tuple[1] = 100 # wont work as they are immutable

# zoo = ['dog', 'cat', 'bird', 'lizard', 'insect']
# zoo.pop(3)
# zoo.append('mammal')
# print(zoo)
# print(zoo[0:3])

# -=-=-=-=-=-=-=-

# Assignment 5

# grade = 69
# if grade >= 90:
#     print('A')
# elif grade >= 80:
#     print('B')
# elif grade >= 70:
#     print('C')
# elif grade >= 60:
#     print('D')
# else:
#     print('F')

# -=-=-=-=-=-=-=-

#Assignment 6:

# my_list = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
# count = 0
# while count != 3:
#     count += 1
#     for i in my_list:
#         if i != 'monday':
#             print(i)


# -=-=-=-=-=-=-=-=-

# Assignment 7:

# user_dict = {
#     'username':'engingedik',
#     'name': 'engin',
#     'age': 32
# }

# print(user_dict)
# print(user_dict.get("username"))#
# user_dict["married"] = False
# print(user_dict)
# user_dict.pop("age")
# print(user_dict)
# user_dict.clear()
# print(user_dict)

# my_vehicle = {
#     "model": "Ford",
#     "make": "Explorer",
#     "year": 2018,
#     "mileage": 40000
# }

# for key, value in my_vehicle.items():
#     print(key, value)

# my_vehicle2 = my_vehicle
# my_vehicle2.pop("mileage")
# my_vehicle2["number_of_tires"] = 4

# print('-----------------')

# for key, value in my_vehicle2.items():
#     print(key, value)


# -=-=-=-=-=-=-=-=-

# Assignment 8:

# def misc_foo(firstname, lastname, age):
#     dict={'firstname':firstname,
#           'lastname':lastname,
#           'age':age
#           }
#     return print(dict)

# misc_foo("engin", "gedik", 20)


# -=-=-=-=-=-=-=-=-


# Assignment 9:

# class Student:
        
#         num_student = 0
#         school = "online school"

#         def __init__(self, firstname, lastname, major):
#             self.firstname = firstname
#             self.lastname = lastname
#             self.major = major
#             Student.num_student += 1

#         def fullname_with_major(self):
#               return f"{self.firstname} {self.lastname} is a {self.major} major"

#         def fullname_major_school(self):
#             return f"{self.firstname} {self.lastname} is a {self.major} major, going to {self.school}"      

#         @classmethod
#         def set_online_school(cls, new_school):
#               cls.school = new_school

#         @classmethod
#         def split_students(cls, student_str):
#               firstname, lastname, major = student_str.split('.')
#               return cls(firstname, lastname, major)

# student1= Student("engin", "gedik", "cs")
# student2= Student("mal", "thiep", "management")

# # print(f"number of students: {Student.num_student}")
# # print(Student.fullname_with_major(student2))
# # print(Student.fullname_major_school(student1))
# # print(student1.school)
# # student1= Student("engin", "gedik", "cs")
# # student2= Student("mal", "thiep", "management")
# # print(f"number of students: {Student.num_student}")
# # print(student1.school)
# # print(student2.school)
# # Student.set_online_school('i use google meets')
# # print(student1.school)
# # print(student2.school)

# new_student = "aadil.sarwar.biomed"
# student3 = Student.split_students(new_student)
# print(student3.firstname)


# -=-=--=-=-=--=-==-

class Student:
    
    def __init__(self, firstname, lastname):
        self.firstname = firstname
        self.lastname = lastname
        
    def greetings(self):
        return f"hello im {self.firstname} {self.lastname}"
    
class CollegeStudents(Student):
    def __init__(self, firstname, lastname, major):
        super().__init__(firstname, lastname)
        self.major = major

    def greetings(self):
        return f"hello im {self.firstname} {self.lastname} and a college student"


class NonCollegeStudent(Student):
    def __init__(self, firstname, lastname, future_job):
        super().__init__(firstname, lastname)
        self.future_job = future_job

    def greetings(self):
        return f"hello im {self.firstname} {self.lastname} and a not a current college student"

student1 = CollegeStudents("engin", "gedik", "cs")
student2 = NonCollegeStudent("kareem", "ali", "surgeon")

print(student1.greetings())
print(student1.major)
print(student2.greetings())
print(student2.future_job)