echo killing
pkill -f BACKEND_PROCESS
echo deploying
bash -c "exec -a BACKEND_PROCESS mvn spring-boot:run"
echo deployed
