#Copy file to the server
ansible multi -m copy -a "src=/etc/hosts dest=/tmp/hosts"
