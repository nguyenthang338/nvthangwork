# Delete directories and files >>.
ansible multi -m file -a "dest=/tmp/test state=absent"
