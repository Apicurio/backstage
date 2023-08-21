# PNC - Project New Castle


The productized builds are executed on PNC.. In short, PNC is a secluded build system, similar in nature to Jenkins and Brew, which is responsible for building middleware components. To better understand PNC, we would need to understand the below terms first:-

Product

↓

Project

↓

Build Groups     	

↓

Build Configuration

↓

PNC build

* <u><b>Product</b></u>: The top-most level entity for PNC is the product. Every product in PNC contains versions and milestones. The version specifies the product version we are building for, and the milestone represents the 'step' at which we are in the version. A typical milestone value is DR1, DR2, etc or ER1, ER2 etc. The combination of the version and milestone forms the full release name of the product: e.g 1.0.0.CR1.The Service Registry content is available on the [Red Hat Integration](http://orch.psi.redhat.com/pnc-web/#/products/111) product page on PNC. The versions, such as the one for [Service Registry 1.0](http://orch.psi.redhat.com/pnc-web/#/products/111/versions/191), contain milestones (such as 1.0.0.CR1, 1.0.0.CR2, 1.0.0.DR2).

* <u><b>Project</b></u>: The Project entity encapsulates the basic properties of a Project, i.e. the name, description, license. It is linked to a list of BuildConfigurations, that contain the build configurations of the Project in its lifetime. The class Project is also linked to a list of BuildRecords, that contains the result of the build triggered with a BuildConfiguration. A project allows us to specify build configs. Build configs are required to do builds. Project is a standalone project like Hibernate or JBoss-Modules. Usually a project represents one SCM repository.


<u><b>Build Groups</b></u>: The components are grouped in build groups (Group Config). A build group can have multiple build configurations and we can trigger multiple builds from these build configurations.


* <u><b>Build Configuration</b></u>: A build configuration is an element within PNC that contains the information about the component, configuration to use when building it, the build script and alignment parameters.


* <u><b>PNC Build</b></u>: A PNC build is an instance of a build configuration. That means that when you trigger a build on PNC, you are instructing PNC to create a new build using the configuration provided. There are 2 types of PNC builds: persistent and temporary. Temporary builds are garbage collected every 2 weeks, whereas permanent builds are not. The permanent builds are used for release builds.


The PNC builds and executes <b >Dependency Alignment</b> - a process that replaces the project dependencies with their respective productized version when available or adjusts them to avoid versions with known CVEs.  PNC executes Dependency Alignment with the help of a tool called <b>Dependency Analyzer</b>. 

Dependency Analyzer is a service, which provides information about built artifacts and analyzes the projects' dependencies. It can lookup the Red Hat build artifacts and inform the users about alternatives instead of the artifacts used in their projects, produces dependency reports of artifacts and resolves dependency trees. Dependency Analyzer also maintains a database of product-artifacts mapping and blacklisted artifacts, which should help the user to decide which artifacts to use in their projects.

A user also has the flexibility to manipulate dependencies alignment . This can be done by using a tool called <b>POM Manipulation Extension (PME)</b>.








