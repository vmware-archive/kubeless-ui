#!/bin/bash

if [[ -n $GITHUB_USER && -n $GITHUB_PASSWORD && -n $DOCKER_PROJECT && -n $IMAGE_NAME ]]; then
  install_hub || exit 1

  # hub release complains if we're not on a branch
  git checkout master

  # update the image tag in the k8s.yaml manifest
  sed 's|image: bitnami/kubeless-ui:.*|image: '"$DOCKER_PROJECT/$IMAGE_NAME:$CIRCLE_TAG"'|g' k8s.yaml > /tmp/k8s.yaml

  # create a github release
  hub release create -m "Release $CIRCLE_TAG" -a /tmp/k8s.yaml $CIRCLE_TAG

  # switch back to the checkout branch
  git checkout -
fi
