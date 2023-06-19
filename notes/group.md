for chat group 
i decided 3 model
1. group information model
2. group message  model
3. group and user junction model


group infor model 
column are
............
id
groupName
logo
superAdmin-this is reltion between user and group,so which user created the group is called superAdmin
.............

2 group_user_junction
...................
id
group
user
admin-true/false


3 group message

id 
groupId
usedId
message