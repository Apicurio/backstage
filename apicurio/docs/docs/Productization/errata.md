# Errata 

We often tend to use the terms ‘Errata’ and ‘Advisory’ interchangeably, However we must understand these two terms individually:-

* Advisory: An official form filled by the engineering team that provides details about the images to be released. 
    Click [here](https://errata.devel.redhat.com/advisory/56651) to see an example Advisory.

* Errata: The Errata Tool is a process management tool that ensures the release readiness of advisories by monitoring and enforcing company requirements and policies defined by the Quality Engineering and Release Engineering groups for shipping products to customers. It ensures that processes, such as the Content Definition Workflow (CDW), and tests, such as RPMDiff and TPS, are followed and completed before Red Hat content is pushed for release to customers via RHN and/or CDN. 

In layman terms, Advisories are created in the Errata tool. We create Advisories stating the images to be released (or) the fixes and enhancements to be shipped for the already released images.. Once the advisory has been created, the Errata tool manages the process of shipping the new Images or software updates to Red Hat Products.

- [Production](https://errata.engineering.redhat.com/):
  The production system.
- [Staging](https://errata.stage.engineering.redhat.com/):
  The staging server will generally run the same code release as production, but with non-production data. You can use the staging server to try things without affecting production advisories.
- Devel-staging:
   * [Dev 1](https://errata-01.devel.engineering.redhat.com/)
   * [Dev 2](https://errata-02.devel.engineering.redhat.com/)

  The devel-staging server will normally run a pre-release version of Errata Tool. It is deployed more frequently and hence may sometimes contain less stable code.
  (To be informed about what is currently deployed to devel-staging, subscribe to the [Errata Dev mailing list](http://post-office.corp.redhat.com/mailman/listinfo/errata-dev-list)).
