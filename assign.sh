docker build -t audit audit_log/
docker build -t process processing/
docker build -t receiver receiver/
docker build -t storage storage/
docker build -t dashboard dashboard-ui/
docker build -t health healthcheck/