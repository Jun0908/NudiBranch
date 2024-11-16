bacalhau docker run \
--gpu 1 \
--timeout 3600 \
--wait-timeout-secs 3600 \
-i <CID-OF-THE-SUBJECT> \
  jsacex/dreambooth:full \
-- bash finetune.sh /inputs /outputs "a photo of <name-of-the-subject> mix" "a photo of mix" 3000 "/mix"  "/model"