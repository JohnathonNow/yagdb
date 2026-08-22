window.BENCHMARK_DATA = {
  "lastUpdate": 1787408185988,
  "repoUrl": "https://github.com/JohnathonNow/yagdb",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "committer": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "id": "6e39d27723bfbd7d1d49bd9eca085e1271788205",
          "message": "ci: Add GitHub Action for benchmark suite",
          "timestamp": "2026-08-20T03:43:36Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/130/commits/6e39d27723bfbd7d1d49bd9eca085e1271788205"
        },
        "date": 1787203127743,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32779,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34008,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61396,
            "range": "± 2080",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45782,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 135482,
            "range": "± 1082",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108821,
            "range": "± 595",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132509,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110150,
            "range": "± 578",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69985,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56267,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133237,
            "range": "± 3330",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109839,
            "range": "± 807",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3087760805,
            "range": "± 18379230",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4463,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7819,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5500,
            "range": "± 61",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9032,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8949,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15144,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 463181,
            "range": "± 7415",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 448481,
            "range": "± 7657",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 500922,
            "range": "± 10515",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 564416,
            "range": "± 20607",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 406103,
            "range": "± 2113",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Johnjwesthoff@gmail.com",
            "name": "John Westhoff",
            "username": "JohnathonNow"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7551ff54fcb81b99a7a988ba2473c051d7599be0",
          "message": "Merge pull request #130 from JohnathonNow/ci-add-benchmarks-workflow-13579803303356226728\n\nci: Add GitHub Action for benchmark suite",
          "timestamp": "2026-08-21T14:32:36-07:00",
          "tree_id": "1aec64e91fd5bf2bbd15e0da804aa304239d2c82",
          "url": "https://github.com/JohnathonNow/yagdb/commit/7551ff54fcb81b99a7a988ba2473c051d7599be0"
        },
        "date": 1787348710939,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33010,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34296,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62040,
            "range": "± 2333",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45938,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132664,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108457,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132672,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107693,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69805,
            "range": "± 507",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57116,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133718,
            "range": "± 2991",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109427,
            "range": "± 405",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3198909159,
            "range": "± 28629838",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4438,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7775,
            "range": "± 3896",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5558,
            "range": "± 1793",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8823,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8865,
            "range": "± 1571",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15247,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464369,
            "range": "± 10903",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 450437,
            "range": "± 2803",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 501476,
            "range": "± 10168",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 572784,
            "range": "± 4640",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 409152,
            "range": "± 5289",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Johnjwesthoff@gmail.com",
            "name": "John Westhoff",
            "username": "JohnathonNow"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9c1fbd2a9dd9936e986d6484a1e8bda9a796b1fb",
          "message": "Merge pull request #132 from JohnathonNow/bolt-box-execution-step-3838375490167516419\n\n⚡ Bolt: Box large ExecutionStep variants to reduce enum size",
          "timestamp": "2026-08-21T14:33:54-07:00",
          "tree_id": "5f3b9fcf23889030af103c9709a1b55ff0b01073",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9c1fbd2a9dd9936e986d6484a1e8bda9a796b1fb"
        },
        "date": 1787348756310,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32532,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34396,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62276,
            "range": "± 958",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 48363,
            "range": "± 311",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130856,
            "range": "± 526",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108487,
            "range": "± 1646",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130878,
            "range": "± 316",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107737,
            "range": "± 870",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67726,
            "range": "± 332",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56169,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131002,
            "range": "± 9636",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108028,
            "range": "± 1714",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2774477922,
            "range": "± 16782419",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3543,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6295,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5017,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7988,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8478,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 13993,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 427596,
            "range": "± 5364",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 406984,
            "range": "± 9369",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 463146,
            "range": "± 9924",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 540162,
            "range": "± 5678",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 356450,
            "range": "± 4041",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "committer": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "id": "4cc85b3c3887bbc170a7b40ea39846dc81e812a9",
          "message": "⚡ Bolt: [feature improvement] Add id() function for retrieving node and edge identifiers",
          "timestamp": "2026-08-21T21:35:33Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/133/commits/4cc85b3c3887bbc170a7b40ea39846dc81e812a9"
        },
        "date": 1787349044345,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33086,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34198,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62732,
            "range": "± 1390",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46147,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132455,
            "range": "± 5883",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107272,
            "range": "± 1210",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133885,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 117931,
            "range": "± 1930",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69900,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56879,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134609,
            "range": "± 221",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110824,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3075147438,
            "range": "± 22848023",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4018,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7284,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5324,
            "range": "± 527",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8399,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8546,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14315,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 429423,
            "range": "± 17699",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 421488,
            "range": "± 1988",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 470156,
            "range": "± 2038",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 536986,
            "range": "± 1735",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 377688,
            "range": "± 2065",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "Johnjwesthoff@gmail.com",
            "name": "John Westhoff",
            "username": "JohnathonNow"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "457359dc7b1b71dc1e0478d5c5c857ef6aa9cf6f",
          "message": "Merge pull request #133 from JohnathonNow/george/add-id-function-10263779521681525921\n\n⚡ Bolt: [feature improvement] Add id() function for retrieving node and edge identifiers",
          "timestamp": "2026-08-21T14:42:42-07:00",
          "tree_id": "a79fff812867d06be81206db285b7d5f5dcd46b6",
          "url": "https://github.com/JohnathonNow/yagdb/commit/457359dc7b1b71dc1e0478d5c5c857ef6aa9cf6f"
        },
        "date": 1787349340434,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33783,
            "range": "± 3968",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34738,
            "range": "± 444",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61511,
            "range": "± 1638",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45855,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132628,
            "range": "± 6786",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107708,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133626,
            "range": "± 1939",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108519,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69519,
            "range": "± 2721",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56162,
            "range": "± 2528",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133578,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107756,
            "range": "± 988",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3273743303,
            "range": "± 30111035",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4116,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7481,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5316,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8503,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8604,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14296,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 431734,
            "range": "± 6446",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 422835,
            "range": "± 3624",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 471411,
            "range": "± 6807",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 540959,
            "range": "± 2087",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 383720,
            "range": "± 5164",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "committer": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "id": "09f5d046c88d2eb224f67518908988adacd11ee3",
          "message": "⚡ George: Add DROP INDEX feature",
          "timestamp": "2026-08-21T21:42:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/134/commits/09f5d046c88d2eb224f67518908988adacd11ee3"
        },
        "date": 1787408185480,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 41116,
            "range": "± 1891",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 43320,
            "range": "± 1353",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61736,
            "range": "± 1471",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46498,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132713,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107276,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132692,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108028,
            "range": "± 6504",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 81846,
            "range": "± 451",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 62144,
            "range": "± 358",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132576,
            "range": "± 638",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108130,
            "range": "± 3205",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3194679905,
            "range": "± 23106047",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4047,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7391,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5359,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8455,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8744,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14244,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 450508,
            "range": "± 6553",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 434202,
            "range": "± 8064",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 487587,
            "range": "± 2384",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 562212,
            "range": "± 4439",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 394090,
            "range": "± 4575",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}