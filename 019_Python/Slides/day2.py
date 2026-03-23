# # # x,y,*z=3,6,9,8,9

# # # print(max(x,y))


# # # mylist=[20,60,10,5]
# # # print(mylist[1])
# # # mylist[1]='saleh'
# # # mylist.append(['ahmed','iti',44])
# # # mylist[4][1]='iti smart'
# # # print(mylist)

# # # mylist.extend([100,200,300])
# # # print(mylist)

# # #f-name,l-name,age,grade
# # stu=[['mohamed','khalid',25,95],['Rana','mohamed',24,45],['ahmed','saleh',22,100]]

# # all=[
# #     {'name':'mohamed','age':25,'grade':95},
# #     {'name':'rana','age':24,'grade':45},
# #     {'name':'ahmed','age':22,'grade':100}
# # ]

# # # print(all[0])
# # # all[1]['age']=22
# # # print(all[1])

# # student={
# #     'name':'mohamed',
# #     'age':25,
# #     'grade':95,
# #     'skills':['python','java','c++']
# # }
# # student['skills'][2]='c#'
# # student['skills'].append('javascript')
# # student.update({'country':'egypt','city':'cairo','age':22,'grade':100})
# # print(student.keys())
# # print(student.values())
# # print(student.items())
# # # print(student.get('name2','not found'))
# # student['name2']=student.pop('name')
# # print(student)
# # student['age']='ahmed'
# # x=2
# # if x==21:
# #     print('two')
# # elif x==23:  
# #     print('two 2')
# # elif x==24:
# #     print('two 3')
# # elif x==25:
# #     print('two 4')
# # elif x==26:
# #     print('two 5')
# # # else:
# #     print('not two')  


# # for(i=0;i<10;i++){
# #     print(i)}
# res=[]
# for i in [2,8,9,40,77,50,1]:
#     if i%2==0:
#         res.append(i)
        
# print(res)


# all=[
#     {'name':'mohamed','age':25,'grade':95},
#     {'name':'rana','age':24,'grade':45},
#     {'name':'ahmed','age':22,'grade':100}
# ]


# for student in all:
#     if student['grade']>=90:
#         print(student['name'],'A')
#     elif student['grade']>=80:
#         print(student['name'],'B')
#     elif student['grade']>=70:
#         print(student['name'],'C')
#     elif student['grade']>=60:
#         print(student['name'],'D')
#     else:
#         pass
    
    
# print('done')

# mylist=[]

# def sum(name,age,grade):
#     mylist.append({'name':name,'age':age,'grade':grade})

# sum('mohamed',25,95)
# sum('rana',24,45)
# sum('ahmed',22,100)

# print(mylist)
# def sum(*args):
#     total=0
#     for number in args:
#         total += number
#     print(total)

# sum(1,2,3,4,5,80,66,90,60)
supermarket_database=[
    {'item':'item1','price':10},
    {'item':'item2','price':20},
    {'item':'item3','price':30},
    {'item':'item4','price':40}
]

def supermarket(*args):
    total=0
    for item, quantity in args:
        for product in supermarket_database:
            if product['item']==item:
                total += product['price'] * quantity
                print(f'{item} x {quantity} = {product["price"] * quantity}')
        
    print('-----------------------------------------')
    print('Total:', total)
    print('VAT:', round(total * 0.14, 2))
    

supermarket(('item1',2),('item2',3),('item3',1),('item4',5))





