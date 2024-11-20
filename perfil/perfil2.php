<?php
$userData = [
    'username' => 'Student',
    'level' => 1,
    'rank' => 'Novice in Sets',
    'status' => 'Online',
    'stats' => [
        'exercises' => 0,
        'accuracy' => 0,
        'problems' => 0,
        'minutes' => 0
    ],
    'xp' => [
        'current' => 0,
        'next_level' => 1000
    ],
    'achievements' => [
        [
            'icon' => '∪',
            'title' => 'Perfect Union',
            'description' => 'Complete 5 set union exercises',
            'unlocked' => false
        ],
        [
            'icon' => '∩',
            'title' => 'Intersection Master',
            'description' => 'Solve 10 intersection problems',
            'unlocked' => false
        ],
        [
            'icon' => '⊆',
            'title' => 'Subsets Expert',
            'description' => 'Correctly identify 15 subsets',
            'unlocked' => false
        ],
        [
            'icon' => '∅',
            'title' => 'Perfect Emptiness',
            'description' => 'Identify 5 empty sets',
            'unlocked' => false
        ]
    ]
];
?>