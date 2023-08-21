# Productization Systems

## What is Productization?
When projects are in a quite mature state and are considered to be of interest to the market, they are productized. Productization involves a series of processes and transformations which is applied to a community project, in order to be suitable as a commercial product. You will do some actions once (setup, configuration, etc), while other actions (build, release, etc) are going to be repeated continuously until the final version of the product is reached.

[Productization Jargon Buster](https://mojo.redhat.com/docs/DOC-951016)

## Prerequisites

### Access 
In order to perform productization related activities, access to the following systems are required:-

* dist-git: stores container and package (rpm) code
* Code.engineering (Gerrit): an internal mirror for the product source code
* PNC: a middleware-oriented build system
* brew: a general-usage build system (ie: for RPM packages and containers)
* OSBS: the brew backend responsible for building containers
* comet: for container management
* UMB: the Unified Message Bus
* errata: manages the process of preparing and shipping software updates to Red Hat Products

Access to most of the productization systems is controlled via LDAP and Kerberos Authentication. Currently the mandatory groups are jboss-prod and devel. You can check your LDAP groups by running the below command. Use your kerberos password when prompted.

- ssh shell.devel.redhat.com groups $USER


jboss-prod is required for code.engineering repositories and devel is required for dist-git repositories. If you’re not a part of these two groups, this can be requested by filling in the form [here](https://redhat.service-now.com/rh_ess/catalog.do?v=1&uri=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Defc26a27053142004c7104229f8248df%26sysparm_link_parent%3D34feb8be2b50c9004c71dc0e59da1553%26sysparm_catalog%3De0d08b13c3330100c8b837659bba8fb4&sysparm_document_key=sc_cat_item,efc26a27053142004c7104229f8248df). The form also allows you to provide the username of a colleague and mirror their permissions. [Here’s](https://redhat.service-now.com/help?id=rh_ticket&table=sc_req_item&sys_id=511fd200db681050c0c8464e1396194c) a sample ticket for the same.

Many systems in Red Hat, such as BREW,  are secured by Kerberos authentication. To be able to do that, your system must be configured to use /etc/krb5.conf. This [step-by-step-guide](https://mojo.redhat.com/docs/DOC-87898) will help you in setting us Kerberos authentication for your system.

For complete information on the Productization Setup, you can follow this [document](https://docs.engineering.redhat.com/display/JPC/Productization+Setup).

### Getting access to Errata Tool:-
- https://errata.devel.redhat.com/user-guide/intro-introduction.html#intro-requesting-access-and-roles-for-a-person
- [Sample Ticket](https://redhat.service-now.com/help?id=rh_ticket&table=x_redha_pnt_devops_table&sys_id=773be3341bb55c101ea57732dd4bcb03)

## Install rhpkg

rhpkg is Red Hat's internal analogue of fedpkg from Fedora's world. It is a command line tool supporting package maintenance and product documentation workflows. rhpkg is the command line tool which is used to  interact with dist-git, brew, OSBS and other services. 

### How to Install rhpkg command?

- Download the appropriate .repo file from http://download.devel.redhat.com/rel-eng/RCMTOOLS/
- Copy the .repo file to /etc/yum.repos.d/
- Run yum or dnf install rhpkg
 
### Docker daemon setup for Downloading Containers

- To download containers from internal registries used by redhat, make sure you have set up your docker daemon to allow insecure registries. This is done on the file /etc/docker/daemon.json. If the file 'daemon.json' doesn't already exist, then create the file and insert the below content:-


    {
        "insecure-registries" : [ "brew-pulp-docker01.web.prod.ext.phx2.redhat.com:8888", 
        "docker-registry.engineering.redhat.com", "registry-proxy.engineering.redhat.com",
        "docker-registry.upshift.redhat.com" ]
    }


- Please restart your docker daemon for the changes to reflect:

    `sudo systemctl restart docker`


- You can verify if the changes are working by running the below command:

    `docker pull brew-pulp-docker01.web.prod.ext.phx2.redhat.com:8888/rhmap42/ups-eap:1.1.4-7`






