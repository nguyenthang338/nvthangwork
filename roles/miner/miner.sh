tmux kill-session -t miner
tmux new -d -s miner
tmux send-keys -t miner "cd ~/Trick/xmr/xmrig/" Enter
tmux send-keys -t miner "bash wallet_xmr.sh" Enter
#tmux a -t miner


